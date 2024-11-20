<?php

namespace App\Providers;

use App\Models\ApprovalSurat;
use App\Observers\ApprovalSuratObserver;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        ApprovalSurat::observe(ApprovalSuratObserver::class);
    }
}
