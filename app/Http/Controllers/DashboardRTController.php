<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardRTController extends Controller
{
    public function index()
    {
        return Inertia::render('DashboardRT', [
            'currentPage' => 'dashboard'
        ]);
    }
}
