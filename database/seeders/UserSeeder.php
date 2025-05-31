<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Menambahkan data pengguna untuk RW
        DB::table('users')->insert([
            [
                'id' => 1,
                'name' => 'rw01',
                'email' => 'rw01@example.com',
                'password' => Hash::make('password'),
                'role' => 'RW',
            ],
            [
                'id' => 2,
                'name' => 'rw02',
                'email' => 'rw02@example.com',
                'password' => Hash::make('password'),
                'role' => 'RW',
            ],
        ]);

        // Menambahkan data pengguna untuk RT
        DB::table('users')->insert([
            [
                'id' => 3,
                'name' => 'rt01rw01',
                'email' => 'rt01@example.com',
                'password' => Hash::make('password'),
                'role' => 'RT',
            ],
            [
                'id' => 4,
                'name' => 'rt01rw02',
                'email' => 'rt02@example.com',
                'password' => Hash::make('password'),
                'role' => 'RT',
            ],
            [
                'id' => 8,
                'name' => 'rt03rw01',
                'email' => 'rt03@example.com',
                'password' => Hash::make('password'),
                'role' => 'RT',
            ],
            [
                'id' => 9,
                'name' => 'rt04rw02',
                'email' => 'rt04@example.com',
                'password' => Hash::make('password'),
                'role' => 'RT',
            ],
        ]);

        // Menambahkan data pengguna untuk Admin
        DB::table('users')->insert([
            [
                'id' => 5,
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'role' => 'Admin',
            ],
        ]);

        // Menambahkan data pengguna untuk Warga
        DB::table('users')->insert([
            [
                'id' => 6,
                'name' => 'John Doe',
                'email' => 'warga01@example.com',
                'password' => Hash::make('password'),
                'role' => 'Warga',
            ],
        ]);
        DB::table('users')->insert([
            [
                'id' => 7,
                'name' => 'Jane Doe',
                'email' => 'warga02@example.com',
                'password' => Hash::make('password'),
                'role' => 'Warga',
            ],
        ]);
    }
}