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
            $dataRT = RT::select( 'nama', 'nik', 'periode', 'penanggung_jawab_rt')
                        ->get();

            $dataRW = RW::select('id_rw', 'nama')
                        ->orderBy('id_rw')
                        ->get();

            // Fetch warga data (assuming Warga model exists)
            $dataWarga = Warga::select('nik_warga','nomer_kk', 'nama', 'jenis_kelamin', 'id_rw', 'id_rt')
                        ->get();

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
