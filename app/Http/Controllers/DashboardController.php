<?php

namespace App\Http\Controllers;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index($page = '')
    {
        $user = Auth::user();

        return match ($user->role) {
            'Admin' => Inertia::render('DashboardAdmin', [
                'currentPage' => $page
            ]),
            'RT' => Inertia::render('DashboardRT', [
                'currentPage' => $page
            ]),
            'RW' => Inertia::render('DashboardRW', [
                'currentPage' => $page
            ]),
            'Warga' => Inertia::render('DashboardWarga', [
                'currentPage' => $page
            ]),
            default => redirect('/')
        };
    }
}
