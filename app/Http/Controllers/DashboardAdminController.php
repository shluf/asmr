<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('DashboardAdmin', [
            'currentPage' => 'dashboard'
        ]);
    }
}
