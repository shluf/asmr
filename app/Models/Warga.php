<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warga extends Model
{
    use HasFactory;

    protected $table = 'warga';
    protected $primaryKey = 'nik_warga';
    public $incrementing = false; // Karena primary key bukan integer

    protected $fillable = [
        'id_user',
        'id_rt',
        'id_rw',
        'nama',
        'nomer_kk',
        'alamat',
        'kabupaten',
        'provinsi',
        'agama',
        'status'
    ];

    public function rt()
    {
        return $this->belongsTo(RT::class, 'id_rt');
    }

    public function rw()
    {
        return $this->belongsTo(RW::class, 'id_rw');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function pengajuanSurat()
    {
        return $this->hasMany(PengajuanSurat::class, 'id_warga');
    }
}