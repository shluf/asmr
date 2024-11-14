<?php

namespace App\Http\Controllers;

use App\Models\Notifikasi;
use App\Models\Warga;
use App\Models\PengajuanSurat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function getNotificationCounts(Request $request)
    {
        $user = Auth::user();
        $counts = [];

        switch ($user->role) {
            case 'Admin':
                // Count unapproved warga for biodataUser
                $biodataCount = Warga::where('approved', 0)->count();
                
                // Count pending role assignments (users without RT/RW/Warga records)
                $approvalCount = \App\Models\User::whereNotIn('id', function($query) {
                    $query->select('id_user')
                          ->from('rt')
                          ->union(
                              \App\Models\User::select('id_user')->from('rw')
                          )
                          ->union(
                              \App\Models\User::select('id_user')->from('warga')
                          );
                })->where('role', '!=', 'Admin')->count();

                $counts = [
                    ['route' => 'biodataUser', 'count' => $biodataCount],
                    ['route' => 'approvalRole', 'count' => $approvalCount]
                ];
                break;

            case 'RT':
            case 'RW':
                // Get the RT/RW ID based on user's role
                $rtId = null;
                $rwId = null;
                
                if ($user->role === 'RT') {
                    $rt = \App\Models\RT::where('id_user', $user->id)->first();
                    $rtId = $rt ? $rt->id_rt : null;
                    $rwId = $rt ? $rt->id_rw : null;
                } else {
                    $rw = \App\Models\RW::where('id_user', $user->id)->first();
                    $rwId = $rw ? $rw->id_rw : null;
                }

                // Count pending pengajuan surat
                $pengajuanCount = PengajuanSurat::where('status_pengajuan', 'Menunggu persetujuan RW')
                    ->when($rtId, function($query) use ($rtId) {
                        return $query->where('id_rt', $rtId);
                    })
                    ->when($rwId && !$rtId, function($query) use ($rwId) {
                        return $query->where('id_rw', $rwId);
                    })
                    ->count();

                // Count notifications for rekap
                $rekapCount = Notifikasi::where('jenis_notif', 'surat')
                    ->where('id_user', $user->id)
                    ->count();

                $counts = [
                    ['route' => 'pengajuanMasalah', 'count' => $pengajuanCount],
                    ['route' => 'rekapPengajuan', 'count' => $rekapCount]
                ];
                break;

            case 'Warga':
                // Get warga record
                $warga = Warga::where('id_user', $user->id)->first();
                
                if ($warga) {
                    // Count pending pengajuan for this warga
                    $pengajuanCount = PengajuanSurat::where('nik_warga', $warga->nik_warga)
                        // ->where('status_pengajuan', 'Pending')
                        ->count();

                    // Count notifications for histori
                    $historiCount = Notifikasi::where('id_user', $user->id)
                        ->where('jenis_notif', 'surat')
                        ->count();

                    $counts = [
                        ['route' => 'histori', 'count' => $pengajuanCount],
                        ['route' => 'pengajuan', 'count' => $historiCount]
                    ];
                }
                break;
        }

        return response()->json($counts);
    }
}