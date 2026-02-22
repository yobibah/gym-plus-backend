<?php

namespace App\Ai\Agents;

use App\Models\User;
use App\Services\AiDataNeeded;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\Conversational;
use Laravel\Ai\Concerns\RemembersConversations;
use Laravel\Ai\Promptable;
use Stringable;

class FinancialAgent implements Agent, Conversational
{
    use Promptable, RemembersConversations;

    public function __construct(public User $user) {}

    /**
     * Get the instructions that the agent should follow.
     */
public function instructions(): string
{
    $data = new AiDataNeeded($this->user);
    $jsonData = $data->Recette(); // tableau avec les variables originales

    // On encode les données en JSON pour OpenAI
    $json = json_encode($jsonData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    return <<<PROMPT
Tu es un assistant financier expert pour une salle de sport. 
Ton rôle est d’analyser les données financières mensuelles et de fournir des rapports clairs et professionnels.

Données disponibles (JSON) :
$json

PROMPT;
}


    /**
     * Get the list of messages comprising the conversation so far.
     */
    public function messages(): iterable
    {
        return [];
    }
}