<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    /**
     * Camps que es poden omplir en assignació massiva
     */
    protected $fillable = [
        'user_id',
        'clicks',
        'points',
        'duration',
    ];

    /**
     * Relació: una partida pertany a un usuari
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
