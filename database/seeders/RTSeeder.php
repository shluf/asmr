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
                'nama' => 'RT 01',
                'nik' => '3201010101010003',
                'periode' => '2022-2025',
                'penanggung_jawab_rt' => 'Ahmad Fauzi',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_user' => 4,
                'id_rw' => 2, // ID dari tabel RW
                'nama' => 'RT 02',
                'nik' => '3201010101010004',
                'periode' => '2022-2025',
                'penanggung_jawab_rt' => 'Dewi Anggraeni',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_user' => 8,
                'id_rw' => 1, // ID dari tabel RW
                'nama' => 'RT 03',
                'nik' => '3201010101010005',
                'periode' => '2022-2025',
                'penanggung_jawab_rt' => 'Siti Aminah',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_user' => 9,
                'id_rw' => 2, // ID dari tabel RW
                'nama' => 'RT 04',
                'nik' => '3201010101010006',
                'periode' => '2022-2025',
                'penanggung_jawab_rt' => 'Muhammad Ali',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Tambahkan data lain jika diperlukan
        ]);
    }
}
