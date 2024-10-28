<?php

namespace App\Http\Controllers;

use App\Models\Warga;
use Illuminate\Http\Request;
use App\Models\PengajuanSurat;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PengajuanController extends Controller
{
    public function getDataWarga(Request $request)
    {
        try {
            $user = Auth::user();

            // Ensure the user is logged in
            if (!$user) {
                return response()->json(['error' => 'User not authenticated'], 401);
            }

            // Fetch the Warga data related to the user
            $dataWarga = Warga::where('id_user', $user->id)->first();

            // Return user and warga data as JSON
            return response()->json([
                'user' => $user,
                'warga' => $dataWarga,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        // Validasi data yang diterima
        // Ambil id_warga dari tabel warga yang terhubung dengan user
        $user = Auth::user();
        $warga = Warga::where('id_user', $user->id)->first();

        if (!$warga) {
            return response()->json([
            'message' => 'Data warga tidak ditemukan untuk user ini',
            ], 404);
        }

        // Tambahkan id_warga ke dalam request
        $request->merge(['nik_warga' => $warga->nik_warga]);

        $validator = Validator::make($request->all(), [
            'nik_warga' => 'required|exists:warga,nik_warga', // Validasi harus ada di tabel wargas
            'id_rt' => 'required|exists:rt,id_rt',      // Validasi harus ada di tabel rts
            'id_rw' => 'required|exists:rw,id_rw',      // Validasi harus ada di tabel rws
            'jenis_surat' => 'required|string',
            'status_pengajuan' => 'required|string',
            'deskripsi' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Simpan data pengajuan ke dalam database
            $pengajuan = PengajuanSurat::create($request->all());

            // Beri respons sukses ke frontend
            return response()->json([
                'message' => 'Pengajuan berhasil diajukan!',
                'pengajuan' => $pengajuan,
            ], 201);
        } catch (\Exception $e) {
            // Tangani kesalahan
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan pengajuan',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
