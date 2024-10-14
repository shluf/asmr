<?php

namespace App\Http\Controllers;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return match ($user->role) {
            'Admin' => Inertia::render('DashboardAdmin'),
            'RT' => Inertia::render('DashboardRT'),
            'RW' => Inertia::render('DashboardRW'),
            'Warga' => Inertia::render('DashboardWarga'),
            default => redirect('/')
        };
    }
}
