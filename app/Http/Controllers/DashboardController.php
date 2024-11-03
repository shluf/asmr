<?php

namespace App\Http\Controllers;
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

        return match ($user->role) {
            'Admin' => Inertia::render('DashboardAdmin', [
                'currentPage' => $page,
            ]),
            'RT' => Inertia::render('DashboardRT', [
                'currentPage' => $page
            ]),
            'RW' => Inertia::render('DashboardRW', [
                'currentPage' => $page
            ]),
            'Warga' => Inertia::render('DashboardWarga', [
                'currentPage' => $page,
                'nik' => $nikWarga
            ]),
            default => redirect('/')
        };
    }
}
