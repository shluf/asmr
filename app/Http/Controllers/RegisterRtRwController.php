<?php

namespace App\Http\Controllers;

use App\Models\RT;
use App\Models\RW;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Storage;

class RegisterRtRwController extends Controller
{
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $request->validate([
                'nama' => 'required|string|max:255',
                'username' => 'required|string|max:255|unique:users,email',
                'password' => ['required', Password::defaults()],
                'nomor' => 'required|string',
                'alamat' => 'required|string',
                'jabatan' => 'required|in:RT,RW',
                'ttd' => 'required|image|mimes:jpeg,png|max:2048', // max 2MB
                'nik' => 'required|string|unique:rw,nik|unique:rt,nik',
                'periode' => 'required|string',

                'id_rw' => 'required_if:jabatan,RT|exists:rw,id_rw',
            ]);

            // Upload tanda tangan
            $ttdPath = null;
            if ($request->hasFile('ttd')) {
                if ($request->file('ttd')->isValid()) {
                    $ttdPath = $request->file('ttd')->store('public/ttd');
                } else {
                    return response()->json(['message' => 'File TTD tidak valid'], 400);
                }
            } else {
                return response()->json(['message' => 'File TTD tidak ditemukan'], 400);
            }
            

            $user = User::create([
                'name' => $request->nama,
                'email' => $request->username,
                'password' => Hash::make($request->password),
                'role' => $request->jabatan,
            ]);

            $commonData = [
                'id_user' => $user->id,
                'nama' => $request->nama,
                'nik' => $request->nik,
                'periode' => $request->periode,
                'ttd' => $ttdPath,
            ];

            if ($request->jabatan === 'RW') {
                // Tambah data RW
                $rw = RW::create(array_merge($commonData, [
                    'penanggung_jawab_rw' => $request->nama,
                ]));
            } else {
                // Tambah data RT
                $rt = RT::create(array_merge($commonData, [
                    'id_rw' => $request->id_rw,
                    'penanggung_jawab_rt' => $request->nama,
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
                    'penanggung_jawab_rw' => $request->nama ?? $rw->penanggung_jawab_rw,
                ]);
            } else {
                $rt = RT::where('id_user', $user->id)->firstOrFail();
                $rt->update([
                    'nama' => $request->nama ?? $rt->nama,
                    'nik' => $request->nik ?? $rt->nik,
                    'periode' => $request->periode ?? $rt->periode,
                    'id_rw' => $request->id_rw ?? $rt->id_rw,
                    'penanggung_jawab_rt' => $request->nama ?? $rt->penanggung_jawab_rt,
                ]);
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

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $user = User::findOrFail($id);

            if ($user->ttd_path) {
                Storage::delete($user->ttd_path);
            }

            $user->delete();

            DB::commit();

            return response()->json([
                'message' => 'Data berhasil dihapus'
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Terjadi kesalahan saat menghapus data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getRWList()
    {
        try {
            $rwList = RW::select('id_rw', 'nama')
                ->orderBy('id_rw')
                ->get();

            return response()->json($rwList);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data RW',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getRTByRW($rwId)
    {
        try {
            $rtList = RT::where('id_rw', $rwId)
                ->select('id_rt', 'nama')
                ->orderBy('id_rt')
                ->get();

            return response()->json($rtList);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data RT',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}