<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PersonajesController;
use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\IsUserAuth;
use App\Http\Controllers\GameController;


//PUBLIC ROUTES
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('personajes', [PersonajesController::class, 'getPersonajes']);
Route::get('/personajes/{id}', [PersonajesController::class, 'getPersonaje']);


//PROTECTED ROUTES IS USER AUTH (LOGIN W TOKEN)
Route::middleware([IsUserAuth::class])->group(function () {
    // 🔑 Autenticació
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'getUser']);

    // 🎭 Personatges (afegeix però no modifica ni elimina)
    Route::post('personajes', [PersonajesController::class, 'addPersonaje']);

    // 🧠 Partides
    Route::get('/games', [GameController::class, 'index']);              // Veure les meves partides
    Route::post('/games', [GameController::class, 'store']);             // Crear partida
    Route::put('/games/{game}/finish', [GameController::class, 'update']); // Finalitzar
    Route::get('/ranking', [GameController::class, 'ranking']);          // TOP 5
});


//ADMIN ROUTES
Route::middleware([IsAdmin::class])->group(function () {
    // 👥 Gestió d'usuaris
    Route::get('users', [AuthController::class, 'getUsers']);
    Route::get('/users/{id}', [AuthController::class, 'getUserById']);
    Route::put('/users/{id}', [AuthController::class, 'updateUser']);
    Route::delete('/users/{id}', [AuthController::class, 'deleteUser']);

    // 🎭 CRUD complet de personatges
    Route::post('personajes', [PersonajesController::class, 'addPersonaje']);
    Route::put('/personajes/{id}', [PersonajesController::class, 'updatePersonaje']);
    Route::delete('/personajes/{id}', [PersonajesController::class, 'deletePersonaje']);

    // 🧠 CRUD complet de partides
    Route::get('/games', [GameController::class, 'index']);              // Veure totes les partides
    Route::delete('/games/{game}', [GameController::class, 'destroy']);  // Eliminar partida
    Route::get('/users/{id}/games', [GameController::class, 'getGamesByUserId']);
});

