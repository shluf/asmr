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
                'id_user' => 3,
                'id_rw' => 1, // ID dari tabel RW
                'nama' => 'Ahamd Dahlan',
                'nik' => '3201010101010003',
                'periode' => '2022-2025',
                'penanggung_jawab_rt' => 'RT 01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_user' => 4,
                'id_rw' => 2, // ID dari tabel RW
                'nama' => 'Dewi Anggraeni',
                'nik' => '3201010101010004',
                'periode' => '2022-2025',
                'penanggung_jawab_rt' => 'RT 02',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_user' => 8,
                'id_rw' => 1, // ID dari tabel RW
                'nama' => 'Siti Aminah',
                'nik' => '3201010101010005',
                'periode' => '2022-2025',
                'penanggung_jawab_rt' => 'RT 03',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_user' => 9,
                'id_rw' => 2, // ID dari tabel RW
                'nama' => 'Muhammad Ali',
                'nik' => '3201010101010006',
                'periode' => '2022-2025',
                'penanggung_jawab_rt' => 'RT 04',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Tambahkan data lain jika diperlukan
        ]);
    }
}
