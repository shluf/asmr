<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warga extends Model{
    use HasFactory;

    protected $table = 'warga';
    protected $primaryKey = 'nik_warga';
    public $incrementing = false; // Karena primary key bukan integer

    protected $fillable = [
        'nik_warga',
        'id_user',
        'id_rt',
        'id_rw',
        'nama',
        'nomer_kk',
        'jenis_kelamin',
        'phone',
        'tempat_dan_tanggal_lahir',
        'alamat',
        'kabupaten',
        'provinsi',
        'agama'
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
    public function getWargaByRtRw($id_rt, $id_rw)
    {
        return $this->where('id_rt', $id_rt)->where('id_rw', $id_rw)->get();
    }

    public function noRT()
    {
        return $this->rt->getNoRT();
    }

    public function noRW()
    {
        return $this->rw->getNoRW();
    }

}
