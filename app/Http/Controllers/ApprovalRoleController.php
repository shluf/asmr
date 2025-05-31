<?php

namespace App\Http\Controllers;

use App\Mail\UserApprovalStatusMail;
use App\Models\Warga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ApprovalRoleController extends Controller
{
    public function index(){
        try{
            $dataWarga = Warga::all()
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

    public function approveUser($nik_warga)
    {
        $warga = Warga::findOrFail($nik_warga);
        $warga->approved = true; // Ganti dengan field yang sesuai
        $warga->save();

        Mail::to($warga->user->email)->send(new UserApprovalStatusMail($warga, true));

        return response()->json(['message' => 'User approved successfully']);
    }

    public function disapproveUser($nik_warga)
    {
        $warga = Warga::findOrFail($nik_warga);
        $warga->approved = false; // Ganti dengan field yang sesuai
        $warga->save();

        Mail::to($warga->user->email)->send(new UserApprovalStatusMail($warga, false));

        return response()->json(['message' => 'User disapproved successfully']);
    }

}