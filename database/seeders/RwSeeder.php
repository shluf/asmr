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
                'nama' => 'RW 01',
                'nik' => '3201010101010001',
                'periode' => '2022-2025',
                'penanggung_jawab_rw' => 'Budi Santoso',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_rw' => 2,
                'id_user' => 2,
                'nama' => 'RW 02',
                'nik' => '3201010101010002',
                'periode' => '2022-2025',
                'penanggung_jawab_rw' => 'Siti Aisyah',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Tambahkan data lain jika diperlukan
        ]);
    }
}
