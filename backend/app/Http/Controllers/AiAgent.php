<?php

namespace App\Http\Controllers;

use App\Ai\Agents\FinancialAgent;
use App\Services\RapportService;
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

            $report = json_decode($response->text, true);
            $rap = new RapportService();
            $lien = $rap->generer($user->salle, $report);
            return response()->json([
                'success' => true,
                'analysis' => (string) $response,
                'conversationsID' => $response->conversationId,
                'report' => $report,
                'lien' => $lien
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
