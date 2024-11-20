<?php

namespace App\Http\Controllers;

use App\Models\Warga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfileWargaController extends Controller
{
    public function show($nik_warga)
    {
        try {
            $warga = Warga::with(['user'])
                         ->where('nik_warga', $nik_warga)
                         ->first();
            $warga->nomor_rt = $warga->noRT();
            $warga->nomor_rw = $warga->noRW();

            if (!$warga) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data warga tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'data' => $warga
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan dalam mengambil detail warga',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $nik_warga)
    {
        try {
            $validator = Validator::make($request->all(), [
                'phone' => 'required|string',
                'alamat' => 'required|string',
                'kabupaten' => 'required|string',
                'provinsi' => 'required|string',
                'agama' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data yang diberikan tidak valid',
                    'errors' => $validator->errors()
                ], 422);
            }

            $warga = Warga::where('nik_warga', $nik_warga)->first();

            if (!$warga) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data warga tidak ditemukan'
                ], 404);
            }

            $warga->update($request->all());

            return response()->json([
                'status' => 'success',
                'message' => 'Data warga berhasil diperbarui',
                'data' => $warga
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan dalam memperbarui data warga',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}