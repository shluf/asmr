<?php

namespace App\Http\Controllers;

use App\Models\Warga;
use Illuminate\Http\Request;

class ApprovalRoleController extends Controller
{
    public function index(){
        try{
            $dataWarga = Warga::all();
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
    public function approveUser($nik_warga)
{
    $warga = Warga::findOrFail($nik_warga);
    $warga->approved = true; // Ganti dengan field yang sesuai
    $warga->save();

    return response()->json(['message' => 'User approved successfully']);
}

public function disapproveUser($nik_warga)
{
    $warga = Warga::findOrFail($nik_warga);
    $warga->approved = false; // Ganti dengan field yang sesuai
    $warga->save();

    return response()->json(['message' => 'User disapproved successfully']);
}

}