<?php

namespace App\Services;

use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use App\Models\PengajuanSurat;
use App\Models\TemplateSurat;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SuratService
{
    public function generateSurat(PengajuanSurat $pengajuan)
    {
        Log::info('Generating surat for:', ['pengajuan' => $pengajuan->toArray()]);

        $warga = $pengajuan->warga;
        $rt = $pengajuan->rt;
        $rw = $pengajuan->rw;

        switch ($pengajuan->jenis_surat) {
            case 'Pengantar KTP':
            case 'Keterangan Domisili':
            case 'Surat Domisili Usaha':
                $jenis_surat = $pengajuan->jenis_surat;
                break;
            default:
                $jenis_surat = "Default";
                break;
        }
        
        // Ambil template berdasarkan jenis surat
        $template = TemplateSurat::where('jenis_surat', $jenis_surat)->first();

        $content = $this->replacePlaceholders($template->template_html, [
            'JENIS_SURAT' => $pengajuan->jenis_surat,
            'KABUPATEN' =>"Sleman",
            'KECAMATAN' =>"Depok",
            'KELURAHAN' =>"Bulaksumur",
            'ALAMAT_KANTOR' => "Bulaksumur, Depok, Sleman Regency, Special Region of Yogyakarta 55281",
            'ID_RT' => $rt->getNoRT(),
            'ID_RW' => $rw->getNoRW(),
            'NAMA_WARGA' => $pengajuan->nama_pemohon,
            'NOMOR_KK' => $warga->nomer_kk,
            'NIK_WARGA' => $pengajuan->nik_pemohon,
            'ALAMAT_WARGA' => $pengajuan->alamat_pemohon,
            'TEMPAT_TGL_LAHIR' => $pengajuan->tempat_tanggal_lahir_pemohon,
            'JENIS_KELAMIN' => $pengajuan->jenis_kelamin_pemohon,
            'AGAMA' => $pengajuan->agama_pemohon,
            'NO_SURAT' => $this->generateNomorSurat($pengajuan),
            'TANGGAL_SURAT' => Carbon::now()->isoFormat('D MMMM Y'),
            'NAMA_RT' => $rt->nama,
            'NAMA_RW' => $rw->nama,
            'TTD_RT' => $this->generateTtdImage($rt->ttd),
            'TTD_RW' => $this->generateTtdImage($rw->ttd)
        ]);

        // Generate PDF
        $pdf = PDF::loadHTML($content);
        $pdf->setPaper('A4', 'portrait');
        
        $filename = Str::slug($pengajuan->jenis_surat . '-' . $warga->nama . '-' . time()) . '.pdf';
        
        // Simpan PDF ke storage public
        $path = 'surat/' . $filename;
        $pdf->save(storage_path('app/public/' . $path));
        
        
        return $path;
    }

    private function generateNomorSurat(PengajuanSurat $pengajuan)
    {
        $prefix = match($pengajuan->jenis_surat) {
            'Pengantar KTP' => 'KTP',
            'Pengantar KK' => 'KK',
            'Keterangan Domisili' => 'DOM',
            'Keterangan Tidak Mampu' => 'SKTM',
            default => 'UMM'
        };

        $count = PengajuanSurat::whereYear('created_at', date('Y'))->count() + 1;
        return sprintf('%s/%03d/RT%02d/RW%02d/%s',
            $prefix,
            $count,
            $pengajuan->id_rt,
            $pengajuan->id_rw,
            date('Y')
        );
    }

    private function generateTtdImage($ttdBase64)
    {
        // Konversi base64 TTD menjadi gambar
        $ttdImage = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $ttdBase64));
        
        // Return dalam format yang bisa digunakan di HTML template
        return "data:image/png;base64," . base64_encode($ttdImage);
    }

    private function replacePlaceholders($template, $data)
    {
        foreach ($data as $key => $value) {
            $template = str_replace('{{' . $key . '}}', $value, $template);
        }
        return $template;
    }
}