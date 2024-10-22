<?php

use App\Http\Controllers\ApprovalRoleController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BiodatasUserController;
use App\Http\Controllers\DashboardAdminController;
use App\Http\Controllers\RegisterRtRwController;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('LandingPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/{page?}', [DashboardController::class, 'index'])->name('dashboard');
});
   

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/rt-rw/store', [RegisterRtRwController::class, 'store'])->name('rt-rw.store');
    Route::put('/rt-rw/{id}', [RegisterRtRwController::class, 'update'])->name('rt-rw.update');
    Route::delete('/rt-rw/{id}', [RegisterRtRwController::class, 'destroy'])->name('rt-rw.destroy');

    Route::get('/rw/list', [RegisterRtRwController::class, 'getRWList'])->name('rw.list');
    Route::get('/rt/by-rw/{rwId}', [RegisterRtRwController::class, 'getRTByRW'])->name('rt.by-rw');


    Route::get('/biodatasUser', [BiodatasUserController::class, 'index'])->name('biodataUser');
    Route::get('/approvalRole', [ApprovalRoleController::class, 'index'])->name('approvalRole');
    Route::post('/approvalRole/approve/{nik_warga}',[ApprovalRoleController::class,'approveUser'])->name("approveUser");
    Route::post('/approvalRole/disapprove/{nik_warga}',[ApprovalRoleController::class,'disapproveUser'])->name("disapproveUser");
});


require __DIR__.'/auth.php';
