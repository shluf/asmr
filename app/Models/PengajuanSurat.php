<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PengajuanSurat extends Model
{
    use HasFactory;

    protected $table = 'pengajuan_surat';
    protected $primaryKey = 'id_pengajuan_surat';

    protected $fillable = [
        'nik_warga',
        'nama_pemohon',
        'nik_pemohon',
        'jenis_kelamin_pemohon',
        'tempat_tanggal_lahir_pemohon',
        'alamat_pemohon',
        'agama_pemohon',
        'id_rt',
        'id_rw',
        'jenis_surat',
        'status_pengajuan',
        'deskripsi'
    ];

    public function warga()
    {
        return $this->belongsTo(Warga::class, 'nik_warga');
    }

    public function rt()
    {
        return $this->belongsTo(RT::class, 'id_rt');
    }

    public function rw()
    {
        return $this->belongsTo(RW::class, 'id_rw');
    }

    public function approvalSurat()
    {
        return $this->hasOne(ApprovalSurat::class, 'id_pengajuan_surat', 'id_pengajuan_surat');
    }
}
