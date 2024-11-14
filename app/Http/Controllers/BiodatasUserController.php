<?php

namespace App\Http\Controllers;

use App\Models\RT;
use App\Models\RW;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Warga;
use Illuminate\Http\Request;
use App\Models\PengajuanSurat;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BiodatasUserController extends Controller
{
    public function index()
    {
        try {
            // Fetch data for RT and RW
            $dataRW = RW::leftJoin('users', 'rw.id_user', '=', 'users.id')->select('rw.*', 'users.email') ->get();
            $dataRT = RT::leftJoin('users','rt.id_user','=','users.id')->select('rt.*','users.email')->get();
            $dataWarga = Warga::all();
            return response()->json([
                'rt' => $dataRT,
                'rw' => $dataRW,
                'warga' => $dataWarga,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function CountData()
    {
        try 
        {
            $countWarga = User::where('role','warga')->count();
            $RtDanRw = User::where('role', 'RT')->orWhere('role', 'RW')->count();
            $CountPengajuanSurat = PengajuanSurat::count();
            $countDataPengajuanPending = PengajuanSurat::where('status_pengajuan','pending')->count();
            $countDataPengajuanSelesai = PengajuanSurat::where('status_pengajuan','!=','pending')->count();


            return response()->json([
                "CountWarga" => $countWarga,
                "CountRtDanRw" => $RtDanRw,
                "CountPengajuanSurat" => $CountPengajuanSurat,
                "CountDataPengajuanPending" => $countDataPengajuanPending,
                "CountDataPengajuanSelesai" => $countDataPengajuanSelesai
            ],200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data',
                'error' => $e->getMessage()
            ], 500);
        }

    }
}
