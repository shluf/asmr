<?php

namespace App\Http\Controllers;

use App\Models\PengajuanSurat;
use App\Models\ApprovalSurat;
use App\Models\Notifikasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SuratController extends Controller
{
    // 1. Menampilkan data warga dan surat yang belum diapprove (RT)
    public function getPendingSuratRT($id_rt)
    {
        $pending_surat = DB::table('pengajuan_surat')
            ->join('warga', 'pengajuan_surat.nik_warga', '=', 'warga.nik_warga')
            ->leftJoin('approval_surat', 'pengajuan_surat.id_pengajuan_surat', '=', 'approval_surat.id_pengajuan_surat')
            ->leftJoin('rt', 'pengajuan_surat.id_rt', '=', 'rt.id_rt')
            ->leftJoin('rw', 'pengajuan_surat.id_rw', '=', 'rw.id_rw')
            ->where('pengajuan_surat.id_rt', $id_rt)
            ->where('approval_surat.status_rt', '=', 'pending')
            ->select(
                'warga.*',
                'pengajuan_surat.*',
                'approval_surat.status_approval',
                'approval_surat.tanggal_approval_rt',
                'rw.penanggung_jawab_rw as penanggung_jawab_rw',
                'rt.penanggung_jawab_rt as penanggung_jawab_rt'
            )
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $pending_surat
        ]);
    }

    // 2. Menampilkan data warga dan surat yang belum diapprove (RW)
    public function getPendingSuratRW($id_rw)
    {
        $pending_surat = DB::table('pengajuan_surat')
            ->join('warga', 'pengajuan_surat.nik_warga', '=', 'warga.nik_warga')
            ->join('approval_surat', 'pengajuan_surat.id_pengajuan_surat', '=', 'approval_surat.id_pengajuan_surat')
            ->leftJoin('rw', 'pengajuan_surat.id_rw', '=', 'rw.id_rw')
            ->leftJoin('rt', 'pengajuan_surat.id_rt', '=', 'rt.id_rt')
            ->where('pengajuan_surat.id_rw', $id_rw)
            ->where('approval_surat.tanggal_approval_rt', '!=', null) // Sudah diapprove RT
            ->where(function($query) {
                $query->whereNull('approval_surat.tanggal_approval_rw')
                      ->where('approval_surat.status_rt', '=', 'approved');
            })
            ->select(
                'warga.*',
                'pengajuan_surat.*',
                'approval_surat.status_approval',
                'approval_surat.tanggal_approval_rt',
                'approval_surat.tanggal_approval_rw',
                'rw.penanggung_jawab_rw as penanggung_jawab_rw',
                'rt.penanggung_jawab_rt as penanggung_jawab_rt'
            )
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $pending_surat
        ]);
    }

    // 3. Menyetujui atau menolak surat
    public function updateApprovalStatus(Request $request, $id_pengajuan_surat)
    {
        $request->validate([
            'status_approval' => 'required|in:approved,rejected',
            'approver_type' => 'required|in:rt,rw',
            'id_approver' => 'required'
        ]);

        try {
            DB::beginTransaction();

            $approval = ApprovalSurat::where('id_pengajuan_surat', $id_pengajuan_surat)->first();

            if (!$approval) {
                throw new \Exception('Data approval tidak ditemukan');
            }
            
            // Update tanggal approval sesuai approver
            if ($request->approver_type === 'rt') {
                $approval->tanggal_approval_rt = now();
                $approval->status_rt = $request->status_approval;
                $status = $request->status_approval === 'approved' ? 'Menunggu persetujuan RW' : 'Selesai';
                $approval->status_approval = $status;

                $notifRt = Notifikasi::where('id_user', $approval->pengajuanSurat->rt->user->id)
                    ->where('id_pengajuan_surat', $id_pengajuan_surat)
                    ->first();

                if ($notifRt) {
                    $notifRt->delete();
                }

                if ($request->status_approval == "approved") {
                    Notifikasi::create([
                        'id_user' => $approval->pengajuanSurat->rw->user->id,
                        'pesan' => $approval->pengajuanSurat->rt->nama . ' telah menyetujui surat pengantar.',
                        'id_pengajuan_surat' => $approval->pengajuanSurat->id_pengajuan_surat,
                        'jenis_notif' => 'surat',
                    ]);
                }
            } else {
                $approval->tanggal_approval_rw = now();
                $approval->status_rw = $request->status_approval;
                $status = $request->status_approval === 'approved' ? 'Menunggu Surat dicetak' : 'Selesai';
                $approval->status_approval = $status;

                $notifRw = Notifikasi::where('id_user', $approval->pengajuanSurat->rw->user->id)
                ->where('id_pengajuan_surat', $id_pengajuan_surat)
                ->first();
                if ($notifRw) {
                    $notifRw->delete();
                }
            }

            $pengajuan = PengajuanSurat::find($id_pengajuan_surat);
            $status = $request->status_approval === 'approved' ? 'disetujui' : 'ditolak';
            $approver = $request->approver_type === 'rt' ? 'RT' : 'RW';
            $pengajuan->status_pengajuan = "Surat " . $status . " " . $approver;
            $pengajuan->save();
            $approval->save();

            // Update status pengajuan

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Status approval berhasil diupdate'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // 4. Menampilkan data pengajuan surat
    public function getAllPengajuanSurat(Request $request)
    {
        $query = DB::table('pengajuan_surat')
            ->join('warga', 'pengajuan_surat.nik_warga', '=', 'warga.nik_warga')
            ->leftJoin('approval_surat', 'pengajuan_surat.id_pengajuan_surat', '=', 'approval_surat.id_pengajuan_surat')
            ->leftJoin('rt', 'pengajuan_surat.id_rt', '=', 'rt.id_rt')
            ->leftJoin('rw', 'pengajuan_surat.id_rw', '=', 'rw.id_rw')
            ->select(
                'pengajuan_surat.*',
                'warga.nama as nama_warga',
                'warga.nomer_kk as no_kk_warga',
                'warga.jenis_kelamin as jenis_kelamin_warga',
                'warga.agama as agama_warga',
                'warga.tempat_dan_tanggal_lahir as ttl_warga',
                'warga.alamat as alamat_warga',
                'approval_surat.status_approval',
                'approval_surat.status_rt',
                'approval_surat.status_rw',
                'approval_surat.tanggal_approval_rt',
                'approval_surat.tanggal_approval_rw',
                'rt.penanggung_jawab_rt as penanggung_jawab_rt', 
                'rw.penanggung_jawab_rw as penanggung_jawab_rw' 
            );

        // Filter berdasarkan status jika ada
        if ($request->has('status')) {
            $query->where('pengajuan_surat.status_pengajuan', $request->status);
        }

        // Filter berdasarkan tanggal jika ada
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('pengajuan_surat.created_at', [
                $request->start_date,
                $request->end_date
            ]);
        }

        if ($request->has('id_rt')) {
            $query->where('pengajuan_surat.id_rt', $request->id_rt);
        }
        
        if ($request->has('id_rw')) {
            $query->where('pengajuan_surat.id_rw', $request->id_rw);
        }        

        if ($request->has('length')) {
            $query->limit($request->length);
        }

        $pengajuan_surat = $query->orderBy('pengajuan_surat.created_at', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $pengajuan_surat
        ]);
    }
}