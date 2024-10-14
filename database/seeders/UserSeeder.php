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
                'name' => 'RW 01',
                'email' => 'rw01@example.com',
                'password' => Hash::make('password'),
                'role' => 'RW',
            ],
            [
                'name' => 'RW 02',
                'email' => 'rw02@example.com',
                'password' => Hash::make('password'),
                'role' => 'RW',
            ],
        ]);

        // Menambahkan data pengguna untuk RT
        DB::table('users')->insert([
            [
                'name' => 'RT 01',
                'email' => 'rt01@example.com',
                'password' => Hash::make('password'),
                'role' => 'RT',
            ],
            [
                'name' => 'RT 02',
                'email' => 'rt02@example.com',
                'password' => Hash::make('password'),
                'role' => 'RT',
            ],
        ]);
    }
}
