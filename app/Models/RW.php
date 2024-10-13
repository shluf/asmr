<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RW extends Model
{
    use HasFactory;
    protected $table = 'rw';
    protected $primaryKey = 'id_rw';

    protected $fillable = [
        'id_user',
        'nama',
        'nik',
        'periode',
        'penanggung_jawab_rw'
    ];

    public function rt()
    {
        return $this->hasMany(RT::class, 'id_rw');
    }

    public function warga()
    {
        return $this->hasMany(Warga::class, 'id_rw');
    }

    public function pengajuanSurat()
    {
        return $this->hasMany(PengajuanSurat::class, 'id_rw');
    }

    public function approvalSurat()
    {
        return $this->hasMany(ApprovalSurat::class, 'id_rw');
    }
}
