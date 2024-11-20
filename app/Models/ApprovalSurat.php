<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApprovalSurat extends Model
{
    use HasFactory;

    protected $table = 'approval_surat';
    protected $primaryKey = 'id_approval_surat';

    protected $fillable = [
        'id_pengajuan_surat',
        'status_rt',
        'status_rw',
        'status_approval',
        'tanggal_approval_rt',
        'tanggal_approval_rw'
    ];

    public function pengajuanSurat()
    {
        return $this->belongsTo(PengajuanSurat::class, 'id_pengajuan_surat');
    }

    public function rt()
    {
        return $this->belongsTo(RT::class, 'id_rt');
    }

    public function rw()
    {
        return $this->belongsTo(RW::class, 'id_rw');
    }
}

