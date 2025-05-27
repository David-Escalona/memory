<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::insert([
            [
                'name' => 'admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('12345678'),
                'role' => 'admin',
            ],
            [
                'name' => 'anna',
                'email' => 'anna@example.com',
                'password' => Hash::make('12345678'),
                'role' => 'user',
            ],
            [
                'name' => 'joan',
                'email' => 'joan@example.com',
                'password' => Hash::make('12345678'),
                'role' => 'user',
            ],
            [
                'name' => 'laia',
                'email' => 'laia@example.com',
                'password' => Hash::make('12345678'),
                'role' => 'user',
            ],
        ]);
    }
}
