<?php

namespace App\Http\Controllers;

use App\Models\PengajuanSurat;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;

class SuratPDFController extends Controller
{
    public function download(PengajuanSurat $pengajuan)
    {
        if (!Storage::disk('public')->exists($pengajuan->pdf_path)) {
            abort(404, 'File surat tidak ditemukan');
        }

        $filename = sprintf(
            'Surat_%s_%s.pdf',
            Str::slug($pengajuan->jenis_surat),
            date('Y-m-d')
        );

        return response()->download(
            storage_path('app/public/' . $pengajuan->pdf_path),
            $filename,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"'
            ]
        );
    }

    public function preview(PengajuanSurat $pengajuan)
    {

        if (!Storage::disk('public')->exists($pengajuan->pdf_path)) {
            abort(404, 'File surat tidak ditemukan');
        }

        return response()->file(
            storage_path('app/public/' . $pengajuan->pdf_path),
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'inline; filename="' . basename($pengajuan->pdf_path) . '"'
            ]
        );
    }
}