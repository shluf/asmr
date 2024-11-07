<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProgramKerjaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('program_kerja')->insert([
            [
                'id_rw' => 1, // pastikan ini sesuai dengan data id_rw di tabel rw
                'jenis_kegiatan' => 'Rapat Koordinasi RT',
                'tanggal' => '2024-09-10',
                'waktu'=>'08:00',
                'tempat' => 'Balai Warga RT 02',
                'penanggung_jawab' => 'Ketua RT 02',
                'created_at' =>now(),
                'updated_at' =>now(),
            ],
            [
                'id_rw' => 1,
                'jenis_kegiatan' => 'Kerja Bakti Lingkungan',
                'tanggal' => '2024-09-17',
                'waktu'=>'08:00',
                'tempat' => 'Lapangan RT 02',
                'penanggung_jawab' => 'Ketua RT 02',
                'created_at' =>now(),
                'updated_at' =>now(),
            ],
            [
                'id_rw' => 2,
                'jenis_kegiatan' => 'Penyuluhan Kesehatan',
                'tanggal' => '2024-09-24',
                'waktu'=>'08:00',
                'tempat' => 'Balai RW 02',
                'penanggung_jawab' => 'Ketua RT 02',
                'created_at' =>now(),
                'updated_at' =>now(),
            ],
        ]);
    }
}

