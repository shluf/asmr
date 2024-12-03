<?php

namespace App\Http\Controllers;

use App\Models\ApprovalSurat;
use App\Models\Notifikasi;
use App\Models\Warga;
use Illuminate\Http\Request;
use App\Models\PengajuanSurat;
use Illuminate\Support\Carbon;
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
            $dataWarga->nomor_rt = $dataWarga->noRT();
            $dataWarga->nomor_rw = $dataWarga->noRW();

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
            'nama_pemohon' => 'required|string',
            'nik_pemohon' => 'required|string',
            'jenis_kelamin_pemohon' => 'required|string',
            'tempat_tanggal_lahir_pemohon' => 'required|string',
            'alamat_pemohon' => 'required|string',
            'agama_pemohon' => 'required|string',
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
            $pengajuan = PengajuanSurat::create([
                'nik_warga' => $request->nik_warga,
                'nama_pemohon' => $request->nama_pemohon,
                'nik_pemohon' => $request->nik_pemohon,
                'jenis_kelamin_pemohon' => $request->jenis_kelamin_pemohon,
                'tempat_tanggal_lahir_pemohon' => $request->tempat_tanggal_lahir_pemohon,
                'alamat_pemohon' => $request->alamat_pemohon,
                'agama_pemohon' => $request->agama_pemohon,
                'id_rt' => $request->id_rt,
                'id_rw' => $request->id_rw,
                'jenis_surat' => $request->jenis_surat,
                'status_pengajuan' => $request->status_pengajuan,
                'deskripsi' => $request->deskripsi,
            ]);
            ApprovalSurat::create([
                'id_pengajuan_surat' => $pengajuan->id_pengajuan_surat,
                'status_approval' => 'Surat telah diajukan',
                'tanggal_approval_rt' => null,
                'tanggal_approval_rw' => null,
            ]);

            Notifikasi::create([
                'id_user' => $warga->rt->user->id,
                'id_pengajuan_surat' => $pengajuan->id_pengajuan_surat,
                'pesan' => $warga->nama . ' telah mengajukan surat pengantar.',
                'jenis_notif' => 'surat',
            ]);

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
    public function getDataPengajuan()
    {
        try {
            $user = Auth::user();
            $warga = Warga::where('id_user', $user->id)->first();

            // Ensure the user is logged in
            if (!$warga) {
                return response()->json([
                'message' => 'Data warga tidak ditemukan untuk user ini',
                ], 404);
            }

            // Fetch the Warga data related to the user
            $dataPengajuan = PengajuanSurat::where('nik_warga', $warga->nik_warga)
            ->limit(2)
            ->get();
            
            return response()->json([
                'user' => $user,
                'pengajuan' => $dataPengajuan,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data',
                'error' => $e->getMessage()
            ], 500);
        }   
    }

    public function getHistoryData($nik_warga)
    {
        $pengajuanSurat = PengajuanSurat::with('approvalSurat')
        ->where('nik_warga', $nik_warga)
        ->get();

        $result = $pengajuanSurat->map(function ($pengajuan) {
            $progress = [];

            if ($pengajuan->approvalSurat) {
                $approval = $pengajuan->approvalSurat;

                $progress[] = [
                    'title' => 'Pengajuan sedang diproses',
                    'description' => 'Menunggu persetujuan RT',
                    'status' => $approval->status_rt === 'pending' ? 'in-progress' : 'approved',
                ];

                $progress[] = [
                    'title' => 'Proses Verifikasi RT',
                    'description' => $approval->status_rt === "pending" ? 'Menunggu persetujuan RT' : ($approval->status_rt === "approved" ? "Pengajuan telah disetujui RT" : "Pengajuan ditolak RT"),
                    'tgl_approval' => $approval->tanggal_approval_rt,
                    'status' => $approval->status_rt,
                ];

                $progress[] = [
                    'title' => 'Proses Verifikasi RW',
                    'description' => $approval->status_rw === "pending" ? 'Menunggu persetujuan RW' : ($approval->status_rw === "approved" ? "Pengajuan telah disetujui RW" : "Pengajuan ditolak RW"),
                    'tgl_approval' => $approval->tanggal_approval_rw,
                    'status' => $approval->status_rt === "approved" && $approval->status_rw === "pending" ? "in-progress"  : $approval->status_rw,
                ];

                $progress[] = [
                    'title' => 'Penerbitan Surat',
                    'description' => $approval->status_approval === "Selesai" && $approval->status_rw === "approved" ? 'Surat telah berhasil diterbitkan' : 'Surat sedang dalam proses penerbitan',
                    'status' => $approval->status_rw !== 'pending' && $approval->status_rt !== 'pending' && $approval->status_approval !== "Selesai" ? 'in-progress' : ($approval->status_rw === 'approved' && $approval->status_rt === 'approved' && $approval->status_approval === "Selesai" ? 'approved' : 'pending'),
                ];
            }

            return [
                'id_pengajuan_surat' => $pengajuan->id_pengajuan_surat,
                'created_at' => $pengajuan->created_at->format('Y-m-d'),
                'jenis_surat' => $pengajuan->jenis_surat,
                'status_pengajuan' => $pengajuan->status_pengajuan,
                'progress' => $progress,
            ];
        });

        return response()->json($result);
    }
}
