<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personajes extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre',
        'url_imagen',
    ];
}
