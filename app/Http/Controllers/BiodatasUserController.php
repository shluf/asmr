<?php

namespace App\Http\Controllers;

use App\Models\RT;
use App\Models\RW;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Warga;
use Illuminate\Http\Request;
use App\Models\PengajuanSurat;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BiodatasUserController extends Controller
{
    public function index()
    {
        try {
            $dataRW = RW::leftJoin('users', 'rw.id_user', '=', 'users.id')
                        ->select('rw.*', 'users.email')
                        ->get()
                        ->map(function ($rw) {
                            $rw->no_rw = $rw->getNoRW();
                            return $rw;
                        });

            $dataRT = RT::leftJoin('users', 'rt.id_user', '=', 'users.id')
                        ->select('rt.*', 'users.email')
                        ->get()
                        ->map(function ($rt) {
                            $rt->no_rt = $rt->getNoRT();
                            $rt->no_rw = $rt->getNoRW();
                            return $rt;
                        });

            $dataWarga = Warga::where('approved', 1)->get()
                        ->map(function ($warga) {
                            $warga->no_rt = $warga->noRT();
                            $warga->no_rw = $warga->noRW();
                            return $warga;
                        });
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

    public function PendingWarga()
    {
        try {
            $dataWarga = Warga::where('approved', null)->get()
                        ->map(function ($warga) {
                            $warga->no_rt = $warga->noRT();
                            $warga->no_rw = $warga->noRW();
                            return $warga;
                        });
            return response()->json([
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
    public function updateRT(Request $request, $id){
        try {

            DB::beginTransaction();
            $RT = RT::findOrFail($id);

            $validate = $request->validate([
                'nama' => 'required',
                'email'=> 'required|email|unique:users,email,'.$RT->id_user,
                'periode' => 'required',
                'penanggung_jawab_rt' => 'required',
                'alamat' => 'required',
            ]);
            
            $user = User::findOrFail($RT->id_user);
            $user->email = $request->email;
            $user->save();
            
            $RT->nama = $request->nama;
            $RT->penanggung_jawab_rt = $request->penanggung_jawab_rt;
            $RT->periode = $request->periode;
            $RT->alamat = $request->alamat;
            $RT->save();
            
            DB::commit();
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function updateRW(Request $request, $id){
        try {
            DB::beginTransaction();
            $RW = RW::findOrFail($id);

            $validate = $request->validate([
                'nama' => 'required',
                'email'=> 'required|email|unique:users,email,'.$RW->id_user,
                'periode' => 'required',
                'penanggung_jawab_rw' => 'required',
                'alamat' => 'required',
            ]);
            
            $user = User::findOrFail($RW->id_user);
            $user->email = $request->email;
            $user->save();
            
            $RW->nama = $request->nama;
            $RW->penanggung_jawab_rw = $request->penanggung_jawab_rw;
            $RW->periode = $request->periode;
            $RW->alamat = $request->alamat;
            $RW->save();
            
            DB::commit();
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
