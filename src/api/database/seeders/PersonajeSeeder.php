<?php

namespace Database\Seeders;

use App\Models\Personajes;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class PersonajeSeeder extends Seeder
{
    public function run(): void
    {
        Personajes::insert([
            [
                'nombre' => 'Mario',
                'url_imagen' => 'https://www.smashbros.com/assets_v2/img/fighter/wario/main8.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'nombre' => 'Luigi',
                'url_imagen' => 'https://www.smashbros.com/assets_v2/img/fighter/wario/main8.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'nombre' => 'Peach',
                'url_imagen' => 'https://www.smashbros.com/assets_v2/img/fighter/wario/main8.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'nombre' => 'Bowser',
                'url_imagen' => 'https://www.smashbros.com/assets_v2/img/fighter/wario/main8.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'nombre' => 'Toad',
                'url_imagen' => 'https://www.smashbros.com/assets_v2/img/fighter/wario/main8.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'nombre' => 'Yoshi',
                'url_imagen' => 'https://www.smashbros.com/assets_v2/img/fighter/wario/main8.png',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ]);
    }
}
