<?php

namespace App\Http\Controllers;

use App\Models\RT;
use App\Models\RW;
use App\Models\User;
use App\Models\Warga;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index($page = '')
    {
        $user = Auth::user();
        $nikWarga = Warga::where('id_user', $user->id)->first()->nik_warga ?? null;
        $idRT = RT::where('id_user', $user->id)->first()->id_rt ?? null;
        $idRW = RW::where('id_user', $user->id)->first()->id_rw ?? null;

        return match ($user->role) {
            'Admin' => Inertia::render('DashboardAdmin', [
                'currentPage' => $page,
            ]),
            'RT' => Inertia::render('DashboardRT', [
                'currentPage' => $page,
                'idRT' => $idRT
            ]),
            'RW' => Inertia::render('DashboardRW', [
                'currentPage' => $page,
                'idRW' => $idRW
            ]),
            'Warga' => Inertia::render('DashboardWarga', [
                'currentPage' => $page,
                'nik' => $nikWarga
            ]),
            default => redirect('/')
        };
    }
}
