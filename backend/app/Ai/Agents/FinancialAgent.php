<?php

namespace App\Ai\Agents;

use App\Models\User;
use App\Services\AiDataNeeded;
use GuzzleHttp\Client;

class FinancialAgent
{
    public function __construct(public User $user) {}

    public function run(): array
    {
        $data = new AiDataNeeded($this->user);

        if (!$data) {
            return ['error' => 'vous n\'avez pas de data'];
        }

        $json = json_encode($data->Recette());

        $prompt = "
Tu es un assistant financier expert pour salle de sport.

Analyse ces données et retourne UNIQUEMENT du JSON valide.

DONNÉES:
$json

FORMAT:
{
  \"resume_executif\": \"\",
  \"analyse_revenus\": \"\",
  \"rentabilite\": \"\",
  \"points_attention\": [],
  \"recommandations_strategiques\": {
    \"immediates\": [],
    \"moyen_terme\": [],
    \"analyse_donnees\": []
  },
  \"conclusion\": \"\"
}
";

        $client = new Client();

        $response = $client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                'Content-Type'  => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-4o-mini',
                'messages' => [
                    ['role' => 'system', 'content' => 'Tu es un assistant financier.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
                'temperature' => 0.3,
            ],
        ]);

        $body = json_decode($response->getBody(), true);

        return json_decode($body['choices'][0]['message']['content'], true);
    }
}