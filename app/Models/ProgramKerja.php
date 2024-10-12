<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramKerja extends Model
{
    use HasFactory;

    protected $table = 'program_kerja';
    protected $primaryKey = 'id_program_kerja';

    protected $fillable = [
        'id_rw',
        'jenis_kegiatan',
        'tanggal',
        'tempat'
    ];

    public function rw()
    {
        return $this->belongsTo(RW::class, 'id_rw');
    }
}
