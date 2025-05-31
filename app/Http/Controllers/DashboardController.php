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

        $data = match ($user->role) {
            'RT' => RT::where('id_user', $user->id)->first(['id_rt', 'nama', 'penanggung_jawab_rt']),
            'RW' => RW::where('id_user', $user->id)->first(['id_rw', 'nama', 'penanggung_jawab_rw']),
            'Warga' => Warga::where('id_user', $user->id)->first(['nik_warga', 'nama']),
            default => null,
        };

        return match ($user->role) {
            'Admin' => Inertia::render('DashboardAdmin', [
                'currentPage' => $page,
                'name' => $user->name,
                'role' => 'Admin',
            ]),
            'RT' => Inertia::render('DashboardRT', [
                'currentPage' => $page,
                'idRT' => $data?->id_rt,
                'name' => $data?->nama,
                'role' => $data?->penanggung_jawab_rt,
            ]),
            'RW' => Inertia::render('DashboardRW', [
                'currentPage' => $page,
                'idRW' => $data?->id_rw,
                'name' => $data?->nama,
                'role' => $data?->penanggung_jawab_rw,
            ]),
            'Warga' => Inertia::render('DashboardWarga', [
                'currentPage' => $page,
                'nik' => $data?->nik_warga,
                'name' => $data?->nama,
                'role' => 'Warga',
            ]),
            default => redirect('/'),
        };
    }
}
