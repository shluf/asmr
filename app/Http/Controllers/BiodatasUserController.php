<?php

namespace App\Http\Controllers;

use App\Models\RT;
use App\Models\RW;
use Inertia\Inertia;
use App\Models\Warga;
use Illuminate\Http\Request;

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
}
