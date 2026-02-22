<?php

namespace App\Http\Controllers;

use App\Ai\Agents\FinancialAgent;
use Illuminate\Http\Request;
use Laravel\Ai\Facades\AI;

class AiAgent extends Controller
{
    public function RapportFinancierBasique(Request $request) 
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return response()->json(['error' => 'Utilisateur non authentifié'], 401);
            }
            
            // Créer l'agent
            $agent = new FinancialAgent($user);
            
            // Utiliser l'agent avec Laravel AI SDK
            $response = $agent->forUser($user)->prompt(
                'Génère un rapport financier complet basé sur les données disponibles.'
            );
            
            return response()->json([
                'success' => true,
                'analysis' => (string) $response
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}