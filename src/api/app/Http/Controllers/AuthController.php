<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate the request with validator library
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'role' => 'required|string|max:100|in:admin,user',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:5|confirmed',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        // Create the user
        $user = User::create([
            'name' => $request->get('name'),
            'role' => $request->get('role'),
            'email' => $request->get('email'),
            'password' => bcrypt($request->get('password')),
        ]);
        // Return the user
        return response()->json([
            'message' => 'User created successfully',
            'data' => $user,
        ], 201);
    }


    //función para login
    public function login(Request $request)
    {
        // Validate the request with validator library
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:100',
            'password' => 'required|string|min:5',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $credentials = $request->only(['email', 'password']);

        // Validate the credentials
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'message' => 'Invalid credentials',
                ], 401);
            }
            return response()->json([
                'message' => 'User logged in successfully',
                'token' => $token,
            ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'error'   => 'Could not create token',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    // 🔍 GET /api/users → veure tots els usuaris
    public function getUsers()
    {
        $users = User::all();
        return response()->json([
            'message' => 'All users retrieved successfully',
            'data' => $users
        ], 200);
    }

    //Route::get('me', [AuthController::class, 'getUser']);
    // 👤 GET /api/me → veure l'usuari autenticat
    public function getUser()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json([
            'message' => 'Hello you are this user! Authenticated user retrieved successfully',
            'data' => $user
        ], 200);
    }

    // 👤 GET /api/users/{id} → veure un usuari concret
    public function getUserById($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json([
            'message' => 'User retrieved successfully',
            'data' => $user
        ], 200);
    }

    // ✏️ PUT /api/users/{id} → actualitzar un usuari
    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:100',
            'email' => 'sometimes|email|max:100|unique:users,email,' . $id,
            'role' => 'sometimes|in:admin,user',
            'password' => 'nullable|string|min:5|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user->name = $request->get('name', $user->name);
        $user->email = $request->get('email', $user->email);
        $user->role = $request->get('role', $user->role);

        if ($request->filled('password')) {
            $user->password = bcrypt($request->get('password'));
        }

        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
            'data' => $user
        ], 200);
    }

    // ❌ DELETE /api/users/{id} → eliminar un usuari
    public function deleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }


    //logout

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json([
                'message' => 'User logged out successfully',
            ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'message' => 'Could not log out user',
            ], 500);
        }
    }
}
