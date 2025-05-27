<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{
    /**
     * Mostrar totes les partides de l'usuari loguejat
     */
    public function index()
    {
        $games = Game::where('user_id', Auth::id())->get();
        return response()->json($games);
    }

    /**
     * Crear una nova partida (amb valors inicials)
     */
    public function store(Request $request)
    {
        $game = Game::create([
            'user_id' => Auth::id(),
            'clicks' => 0,
            'points' => 0,
            'duration' => null,
        ]);

        return response()->json([
            'message' => 'Partida creada correctament',
            'game' => $game
        ], 201);
    }

    /**
     * Mostrar una partida concreta (només si ets el propietari)
     */
    public function show(Game $game)
    {
        if ($game->user_id !== Auth::id()) {
            return response()->json(['error' => 'No tens permís'], 403);
        }

        return response()->json($game);
    }

    /**
     * Actualitzar una partida finalitzada (clics, punts, duració)
     */
    public function update(Request $request, Game $game)
    {
        if ($game->user_id !== Auth::id()) {
            return response()->json(['error' => 'No tens permís'], 403);
        }

        $game->update([
            'clicks' => $request->input('clicks'),
            'points' => $request->input('points'),
            'duration' => $request->input('duration')
        ]);

        return response()->json([
            'message' => 'Game updated successfully',
            'game info' => $game
        ]);
    }

    /**
     * Esborrar una partida (només admin o propietari)
     */
    public function destroy(Game $game)
    {
        if ($game->user_id !== Auth::id() && !Auth::user()->isAdmin) {
            return response()->json(['error' => 'No tens permís per eliminar aquesta partida'], 403);
        }

        $game->delete();

        return response()->json([
            'message' => 'Partida eliminada correctament'
        ]);
    }

    /**
     * Rànquing dels 5 millors jugadors (menys temps i menys clics)
     */
    public function ranking()
    {
        $ranking = Game::select('user_id')
            ->selectRaw('MIN(duration) as best_time')
            ->selectRaw('MIN(clicks) as min_clicks')
            ->selectRaw('MAX(points) as max_points')
            ->groupBy('user_id')
            ->orderBy('best_time')
            ->orderBy('min_clicks')
            ->with('user')
            ->take(5)
            ->get();

        return response()->json($ranking);
    }

    /**
     * Mostrar totes les partides d’un usuari (només si ets admin)
     */
    public function getGamesByUserId($id)
    {
        // Si no ets admin, rebutja la petició
        if (!Auth::user()->isAdmin) {
            return response()->json(['error' => 'No tens permisos'], 403);
        }

        // Busquem les partides de l’usuari amb id concret
        $games = Game::where('user_id', $id)->with('user')->get();

        if ($games->isEmpty()) {
            return response()->json(['message' => 'Aquest usuari no té cap partida o no existeix'], 404);
        }

        return response()->json([
            'message' => 'Partides de l’usuari trobades correctament',
            'data' => $games
        ]);
    }
}
//comenta en bloque

// Pas a pas del codi
// Anem a veure com funciona el mètode ranking() del GameController.
// $ranking = Game::select('user_id')
// Comencem una consulta Eloquent sobre el model Game.

//     ->selectRaw('MIN(duration) as best_time')
//     ->selectRaw('MIN(clicks) as min_clicks')
//     ->selectRaw('MAX(points) as max_points')

// Afegim agregats SQL:

// MIN(duration) ➜ menor temps per usuari (millor partida)
// MIN(clicks) ➜ menys clics fets en una partida
// MAX(points) ➜ màxim punts aconseguits

// Això no retorna totes les partides, sinó un resum per usuari.

//    ->groupBy('user_id')

// Agrupem les dades per usuari. És com fer:


// GROUP BY user_id

//     ->orderBy('best_time')
//     ->orderBy('min_clicks')
// Ordenem perquè primer apareguin els usuaris que han fet la millor partida (menys temps i clics).

//   ->with('user')

//Aquí entra Eloquent a tope: carrega la relació amb el model User.
// Gràcies a això, el frontend pot mostrar el nom o l'email de l’usuari sense fer més consultes.

//     ->take(5)
//     ->get();
// Agafem només els 5 primers i executem la consulta (get()).

// Què fa Eloquent aquí?
// Eloquent actua com a pont entre PHP i SQL i ens ofereix:

// SQL tradicional	Eloquent
// SELECT MIN(), GROUP BY	selectRaw(), groupBy()
// JOIN amb la taula users	.with('user') (fa automàticament el JOIN)
// ORDER BY	orderBy('best_time'), orderBy('min_clicks')
// LIMIT 5	take(5)
// SELECT amb relacions	Torna models Game amb relació user ja carregada
