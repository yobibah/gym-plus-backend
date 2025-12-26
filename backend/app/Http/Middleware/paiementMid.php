<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class paiementMid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */


public function handle(Request $request, Closure $next): Response
{
    $user = $request->user(); 


    if (!$user) {
        return response()->json([
            'message'=> 'Non authentifié',
            'user'=>$user
        ], 401);
    }

    if (!$user->hasRole("Gerant")) {
        return response()->json([
            'message'=> 'Non autorisé'
        ], 403);
    }

    $paiement = $user->dernierPaiementReussi;

    if (!$paiement || $paiement->fin < Carbon::now()) {
        return response()->json([
            'message' => 'Votre abonnement a expiré'
        ], 403);
    }

    return $next($request);
}

}
