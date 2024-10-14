<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RTSeeder extends Seeder
{
    public function run()
    {
        DB::table('rt')->insert([
            [
                'id_rw' => 1, 
                'nama' => 'RT 01',
                'nik' => '3201010101010003',
                'periode' => '2022-2025',
                'penanggung_jawab_rt' => 'Ahmad Fauzi',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_rw' => 2, // ID dari tabel RW
                'nama' => 'RT 02',
                'nik' => '3201010101010004',
                'periode' => '2022-2025',
                'penanggung_jawab_rt' => 'Dewi Anggraeni',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Tambahkan data lain jika diperlukan
        ]);
    }
}
