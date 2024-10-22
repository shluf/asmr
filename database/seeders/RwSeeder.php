<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RWSeeder extends Seeder
{
    public function run()
    {
        DB::table('rw')->insert([
            [
                'id_rw' => 1,
                'id_user' => 1,
                'nama' => 'Budi Santoso',
                'nik' => '3201010101010001',
                'periode' => '2022-2025',
                'penanggung_jawab_rw' => 'RW 01',
                'alamat' => 'Jalan Kenanga No. 10, RT 01, RW 05, Kelurahan Melati, Kecamatan Cempaka, Kota Bandung, Jawa Barat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_rw' => 2,
                'id_user' => 2,
                'nama' => 'Siti Aisyah',
                'nik' => '3201010101010002',
                'periode' => '2022-2025',
                'penanggung_jawab_rw' => 'RW 02',
                'alamat' => 'Jalan Kenanga No. 10, RT 01, RW 05, Kelurahan Melati, Kecamatan Cempaka, Kota Bandung, Jawa Barat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Tambahkan data lain jika diperlukan
        ]);
    }
}
