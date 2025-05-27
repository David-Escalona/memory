<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsUserAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth('api')->user()) {
            return $next($request); //POTS PASSAR !!!! 😊
        } else {
            return response()->json([
                'message' => 'Unauthorized Invalid Token' // No es pot passar 😒
            ], 401);
        }
    }
}
