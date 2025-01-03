<?php

namespace App\Services;

use App\Models\Notifikasi;
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
        $user = $warga->user;
        
        $ttd_rt_path = $rt->ttd 
        ? storage_path('app/public/' . $rt->ttd) 
        : public_path('img/placeholder_ttd.png');
        
        $ttd_rw_path = $rw->ttd 
        ? storage_path('app/public/' . $rw->ttd) 
        : public_path('img/placeholder_ttd.png');

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
            'JENIS_KELAMIN' => $pengajuan->jenis_kelamin_pemohon === "L" ? "Laki-laki" : "Perempuan",
            'AGAMA' => $pengajuan->agama_pemohon,
            'NO_SURAT' => $this->generateNomorSurat($pengajuan),
            'TANGGAL_SURAT' => Carbon::now()->isoFormat('D MMMM Y'),
            'NAMA_RT' => $rt->nama,
            'NAMA_RW' => $rw->nama,
            'TTD_RT' => $ttd_rt_path,
            'TTD_RW' => $ttd_rw_path
        ]);

        // Generate PDF
        $pdf = PDF::loadHTML($content);
        $pdf->setPaper('A4', 'portrait');
        
        $filename = Str::slug($pengajuan->jenis_surat . '-' . $warga->nama . '-' . time()) . '.pdf';
        
        // Simpan PDF ke storage public
        $path = 'surat/' . $filename;
        $pdf->save(storage_path('app/public/' . $path));
        
        Notifikasi::create([
            'id_user' => $user->id,
            'pesan' => 'Surat pengantar Anda telah siap diunduh.',
            'id_pengajuan_surat' => $pengajuan->id_pengajuan_surat,
            'jenis_notif' => 'surat',
        ]);
        
        return $path;
    }

    private function generateNomorSurat(PengajuanSurat $pengajuan)
    {
        $prefix = match($pengajuan->jenis_surat) {
            'Pengantar KTP' => 'KTP',
            'Pengantar KK' => 'KK',
            'Pengantar Akta Kelahiran' => 'AK',
            'Surat Keterangan Kematian' => 'SKK',
            'Surat Domisili Tempat tinggal' => 'DTT',
            'Surat Domisili Usaha' => 'DTT',
            'Surat Keterangan Tidak Mampu' => 'SKTM',
            'Surat SKCK' => 'SKCK',
            'Surat Ketenagakerjaan' => 'SKTK',
            'Surat Pengantar Nikah' => 'SPN',
            'Surat Keterangan Pindah' => 'SKP',
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

    private function replacePlaceholders($template, $data)
    {
        foreach ($data as $key => $value) {
            $template = str_replace('{{' . $key . '}}', $value, $template);
        }
        return $template;
    }
}