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
        'id_warga',
        'id_rt',
        'id_rw',
        'jenis_surat',
        'status_pengajuan',
        'tanggal_pengajuan',
        'deskripsi'
    ];

    public function warga()
    {
        return $this->belongsTo(Warga::class, 'id_warga');
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
        return $this->hasMany(ApprovalSurat::class, 'id_pengajuan_surat');
    }
}
