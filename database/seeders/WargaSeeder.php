<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WargaSeeder extends Seeder
{
    public function run()
    {
    DB::table('warga')->insert([
        [
            'nik_warga' => '1234567890123456',
            'id_user' => 6,
            'id_rt' => 1,
            'id_rw' => 1,
            'nama' => 'John Doe',
            'nomer_kk' => '1234567890',
            'jenis_kelamin' => 'L',
            'phone' => '081234567890',
            'tempat_dan_tanggal_lahir' => 'Jakarta, 1990-01-01',
            'alamat' => 'Jl. Contoh No. 1',
            'kabupaten' => 'Jakarta',
            'provinsi' => 'DKI Jakarta',
            'agama' => 'Islam',
        ],
        [
            'nik_warga' => '1234567890123457',
            'id_user' => 7,
            'id_rt' => 1,
            'id_rw' => 1,
            'nama' => 'Jane Doe',
            'nomer_kk' => '1234567891',
            'jenis_kelamin' => 'P',
            'phone' => '081234567891',
            'tempat_dan_tanggal_lahir' => 'Bandung, 1992-02-02',
            'alamat' => 'Jl. Contoh No. 2',
            'kabupaten' => 'Bandung',
            'provinsi' => 'Jawa Barat',
            'agama' => 'Kristen',
        ],
    ]);

    }
}
