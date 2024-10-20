<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RT extends Model
{
    use HasFactory;

    protected $table = 'rt';

    protected $primaryKey = 'id_rt';

    protected $fillable = [
        'id_user',
        'id_rw',
        'nama',
        'nik',
        'periode',
        'ttd',
        'penanggung_jawab_rt'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function rw()
    {
        return $this->belongsTo(RW::class, 'id_rw');
    }

    public function warga()
    {
        return $this->hasMany(Warga::class, 'id_rt');
    }

    public function pengajuanSurat()
    {
        return $this->hasMany(PengajuanSurat::class, 'id_rt');
    }

    public function approvalSurat()
    {
        return $this->hasMany(ApprovalSurat::class, 'id_rt');
    }

}
