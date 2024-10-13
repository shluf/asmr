<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'role' => 'Admin',
            ],
            [
                'name' => 'Warga User',
                'email' => 'warga@example.com',
                'password' => Hash::make('password'),
                'role' => 'Warga',
            ],
            [
                'name' => 'RT User',
                'email' => 'rt@example.com',
                'password' => Hash::make('password'),
                'role' => 'RT',
            ],
            [
                'name' => 'RW User',
                'email' => 'rw@example.com',
                'password' => Hash::make('password'),
                'role' => 'RW',
            ],
        ]);
    }
}
