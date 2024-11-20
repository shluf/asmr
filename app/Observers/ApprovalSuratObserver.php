<?php

namespace App\Observers;

use App\Models\ApprovalSurat;
use App\Services\SuratService;
use Illuminate\Support\Facades\Log;

class ApprovalSuratObserver
{
    protected $suratService;

    public function __construct(SuratService $suratService)
    {
        $this->suratService = $suratService;
        Log::info('ApprovalSuratObserver created');
    }

    public function updated(ApprovalSurat $approval)
    {
        Log::info('ApprovalSurat Updated', $approval->toArray());
        
        if ($approval->status_rt === 'approved' &&
            $approval->status_rw === 'approved' && 
            $approval->tanggal_approval_rt && 
            $approval->tanggal_approval_rw &&
            $approval->status_approval !== 'Selesai') {
            
            $pdfPath = $this->suratService->generateSurat($approval->pengajuanSurat);
            
            $approval->pengajuanSurat->update([
                'status_pengajuan' => 'Selesai',
                'pdf_path' => $pdfPath
            ]);
            $approval->update([
                'status_approval' => 'Selesai'
            ]);
        }
    }
}