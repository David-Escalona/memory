<?php

namespace App\Http\Controllers;

use App\Models\Personajes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PersonajesController extends Controller
{
    //addPersonaje with Validator library
    public function addPersonaje(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:100',
            'url_imagen' => 'required|url',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        Personajes::create([
            'nombre' => $request->get('nombre'),
            'url_imagen' => $request->get('url_imagen'),
        ]);
        return response()->json([
            'message' => 'Personaje created successfully',
            'data' => $request->all(),
        ], 201);
    }
    //getPersonajes
    public function getPersonajes()
    {
        $personajes = Personajes::all();
        return response()->json($personajes, 200);
    }
    //getPersonaje
    public function getPersonaje($id)
    {
        $personaje = Personajes::find($id);
        if (!$personaje) {
            return response()->json([
                'message' => 'Personaje not found',
            ], 404);
        }
        return response()->json($personaje, 200);
    }
    //updatePersonaje
    public function updatePersonaje(Request $request, $id)
    {
        $personaje = Personajes::find($id);
        if (!$personaje) {
            return response()->json([
                'message' => 'Personaje not found',
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:100',
            'url_imagen' => 'required|url',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $personaje->update([
            'nombre' => $request->get('nombre'),
            'url_imagen' => $request->get('url_imagen'),
        ]);
        return response()->json([
            'message' => 'Personaje updated successfully',
            'data' => $personaje,
        ], 200);
    }
    //deletePersonaje
    public function deletePersonaje($id)
    {
        $personaje = Personajes::find($id);
        if (!$personaje) {
            return response()->json([
                'message' => 'Personaje not found',
            ], 404);
        }
        $personaje->delete();
        return response()->json([
            'message' => 'Personaje deleted successfully',
        ], 200);
    }
    
}
