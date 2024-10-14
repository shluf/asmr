<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Warga;
use App\Models\Rt;
use App\Models\Rw;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class WargaController extends Controller
{
    public function register(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'nik_warga' => 'required|string|unique:warga,nik_warga',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'id_rt' => 'required|integer',
            'id_rw' => 'required|integer',
            'nama' => 'required|string',
            'nomer_kk' => 'required|string',
            'alamat' => 'required|string',
            'kabupaten' => 'required|string',
            'provinsi' => 'required|string',
            'agama' => 'required|string',
            'status' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        


        // Buat user baru
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role'=> 'Warga',
            'password' => Hash::make($request->password),
        ]);

        // Simpan data warga
        $warga = Warga::create([
            'nik_warga' => $request->nik_warga,
            'id_user' => $user->id,
            // 'id_rt' => $rt->id,
            // 'id_rw' => $rw->id,
            'nama' => $request->nama,
            'nomer_kk' => $request->nomer_kk,
            'alamat' => $request->alamat,
            'kabupaten' => $request->kabupaten,
            'provinsi' => $request->provinsi,
            'agama' => $request->agama,
            'status' => $request->status,
        ]);

        return response()->json($warga, 201);
    }
}