<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Game;

class GameSeeder extends Seeder
{
    public function run(): void
    {
        Game::insert([
            ['user_id' => 2, 'clicks' => 22, 'points' => 8, 'duration' => 60],
            ['user_id' => 2, 'clicks' => 18, 'points' => 10, 'duration' => 45],
            ['user_id' => 3, 'clicks' => 30, 'points' => 7, 'duration' => 75],
            ['user_id' => 3, 'clicks' => 27, 'points' => 9, 'duration' => 65],
            ['user_id' => 4, 'clicks' => 15, 'points' => 12, 'duration' => 40],
            ['user_id' => 4, 'clicks' => 20, 'points' => 11, 'duration' => 50],
            
        ]);
    }
}
