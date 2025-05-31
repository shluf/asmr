<?php

namespace App\Http\Controllers;

use App\Models\RT;
use App\Models\RW;
use App\Models\User;
use App\Models\Warga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class RegisterRtRwController extends Controller
{
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validationRules = [
                'nama' => 'required|string|max:255',
                'username' => 'required|string|max:255|unique:users,email',
                'password' => ['required', Password::defaults()],
                'jabatan' => 'required|in:RT,RW',
                'alamat' => 'required|string',
                'ttd' => 'required|image|mimes:jpeg,png|max:2048', // max 2MB
                'nik' => 'required|string|unique:rw,nik|unique:rt,nik',
                'periode' => 'required|string',
                'id_rw' => 'required_if:jabatan,RT|exists:rw,id_rw',
            ];
    
            $validationRules['nomor'] = [
                'required',
                'string',
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->jabatan === 'RT') {
                        $combined = 'RT ' . $value;
                        $exists = RT::where('id_rw', $request->id_rw)
                                   ->where('penanggung_jawab_rt', $combined)
                                   ->exists();
                        
                        if ($exists) {
                            $fail("RT $value sudah terdaftar pada RW yang sama.");
                        }
                    }
                }
            ];
    
            $request->validate($validationRules);

            // Upload tanda tangan
            $ttdPath = null;
            if ($request->hasFile('ttd')) {
                if ($request->file('ttd')->isValid()) {
                    $ttdPath = $request->file('ttd')->store('ttd');
                } else {
                    return response()->json(['message' => 'File TTD tidak valid'], 400);
                }
            } else {
                return response()->json(['message' => 'File TTD tidak ditemukan'], 400);
            }
            

            $user = User::create([
                'name' => $request->username,
                'email' => $request->username,
                'password' => Hash::make($request->password),
                'role' => $request->jabatan,
            ]);

            $commonData = [
                'id_user' => $user->id,
                'nama' => $request->nama,
                'nik' => $request->nik,
                'periode' => $request->periode,
                'alamat' => $request->alamat,
                'ttd' => $ttdPath,
            ];

            if ($request->jabatan === 'RW') {
                // Tambah data RW
                $rw = RW::create(array_merge($commonData, [
                    'penanggung_jawab_rw' => 'RW '. $request->nomor,
                ]));
            } else {
                // Tambah data RT
                $rt = RT::create(array_merge($commonData, [
                    'id_rw' => $request->id_rw,
                    'penanggung_jawab_rt' => 'RT ' . $request->nomor,
                ]));
            }

            DB::commit();

            return response()->json([
                'message' => 'Data berhasil ditambahkan',
                'role' => $request->jabatan
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            
            // Hapus file yang sudah diupload jika ada error
            if (isset($ttdPath)) {
                Storage::delete($ttdPath);
            }

            return response()->json([
                'message' => 'Terjadi kesalahan saat menambahkan data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $validatedData = $request->validate([
                'nama' => 'sometimes|string|max:255',
                'username' => 'sometimes|string|max:255|unique:users,email,'.$id.',id',
                'password' => ['sometimes', Password::defaults()],
                'nik' => 'sometimes|string|unique:rw,nik|unique:rt,nik,'.$id,
                'periode' => 'sometimes|string',
                'alamat' => 'sometimes|string',
                'ttd' => 'sometimes|image|mimes:jpeg,png|max:2048',
                'id_rw' => 'sometimes|exists:rw,id_rw',
            ]);     

            $user = User::findOrFail($id);
            $userData = [
                'name' => $request->nama ?? $user->name,
                'email' => $request->username ?? $user->email,
            ];

            if ($request->has('password')) {
                $userData['password'] = Hash::make($request->password);
            }

            $user->update($userData);

            if ($request->hasFile('ttd')) {
                if ($user->ttd_path) {
                    Storage::delete($user->ttd_path);
                }
                $ttdPath = $request->file('ttd')->store('public/ttd');
                $userData['ttd_path'] = $ttdPath;
            }

            if ($user->role === 'RW') {
                $rw = RW::where('id_user', $user->id)->firstOrFail();
                $rw->update([
                    'nama' => $request->nama ?? $rw->nama,
                    'nik' => $request->nik ?? $rw->nik,
                    'periode' => $request->periode ?? $rw->periode,
                    'penanggung_jawab_rw' => $request->penanggung_jawab_rw ?? $rw->penanggung_jawab_rw,
                ]);
            } elseif ($user->role === 'RT') {
                $rt = RT::where('id_user', $user->id)->firstOrFail();
                $rt->update([   
                    'nama' => $request->nama ?? $rt->nama,
                    'nik' => $request->nik ?? $rt->nik,
                    'periode' => $request->periode ?? $rt->periode,
                    'id_rw' => $request->id_rw ?? $rt->id_rw,
                    'penanggung_jawab_rt' => $request->penanggung_jawab_rt ?? $rt->penanggung_jawab_rt,
                ]);
            } else {
                return response()->json(['message' => 'Role tidak valid'], 400);
            }

            DB::commit();

            return response()->json([
                'message' => 'Data berhasil diperbarui'
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Terjadi kesalahan saat memperbarui data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id, Request $request)
{
    try {
        DB::beginTransaction();

        // Allow deletion by either warga_id or user_id
        $warga = $request->has('user_id') 
            ? Warga::where('id_users', $request->user_id)->firstOrFail()
            : Warga::findOrFail($id);

        // Get related data before deletion
        $user = $warga->user;
        $pejabatData = $warga->pejabatRT ?: $warga->pejabatRW;
        $role = $pejabatData ? ($warga->pejabatRT ? 'RT' : 'RW') : 'Warga';
        
        // 1. Delete signature file if exists
        if ($pejabatData && $pejabatData->ttd) {
            Storage::delete(str_replace('/storage', 'public', $pejabatData->ttd));
        }

        // 2. Delete official position if exists
        if ($pejabatData) {
            $pejabatData->delete();
        }

        // 3. Delete address
        if ($warga->alamat) {
            $warga->alamat()->delete();
        }

        // 4. Delete warga record
        $warga->delete();

        // 5. Delete user account (optional - can be made configurable)
        $deleteUser = $request->input('delete_user', true);
        if ($deleteUser) {
            $user->delete();
        }

        DB::commit();

        return response()->json([
            "message" => "Data berhasil dihapus",
            "deleted" => [
                "role" => $role,
                "warga_id" => $warga->id,
                "user_id" => $user->id,
                "user_deleted" => $deleteUser
            ]
        ], 200);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'error' => 'Gagal menghapus data',
            'message' => $e->getMessage()
        ], 500);
    }
}
    
}