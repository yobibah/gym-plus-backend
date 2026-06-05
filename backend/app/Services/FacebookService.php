<?php

namespace App\Services;

use App\Models\Facebook;
use Illuminate\Support\Facades\Http;

class FacebookService
{
    private string $baseUrl = 'https://graph.facebook.com/v19.0';

    public function extendToken(string $shortToken): string
    {
        $response = Http::get("{$this->baseUrl}/oauth/access_token", [
            'grant_type'        => 'fb_exchange_token',
            'client_id'         => config('services.facebook.client_id'),
            'client_secret'     => config('services.facebook.client_secret'),
            'fb_exchange_token' => $shortToken,
        ]);

        if ($response->failed()) {
            throw new \Exception('Token Facebook invalide : ' . $response->json('error.message'));
        }

        return $response->json('access_token');
    }

    public function getManagedPages(string $userToken): array
    {
        $response = Http::get("{$this->baseUrl}/me/accounts", [
            'access_token' => $userToken,
        ]);

        if ($response->failed()) {
            throw new \Exception('Impossible de récupérer les pages : ' . $response->json('error.message'));
        }

        return $response->json('data', []);
    }

    public function publishEvent(Facebook $page, array $data): array
    {
        $response = Http::post("{$this->baseUrl}/{$page->page_id}/events", [
            'name'         => $data['title'],
            'description'  => $data['description'] ?? '',
            'start_time'   => $this->formatDate($data['start_date']),
            'end_time'     => isset($data['end_date']) ? $this->formatDate($data['end_date']) : null,
            'access_token' => $page->access_token,
        ]);

        if ($response->failed()) {
            throw new \Exception('Erreur publication Facebook : ' . $response->json('error.message'));
        }

        return $response->json();
    }
    public function exchangeCode(string $code): string
{
    $response = Http::get("{$this->baseUrl}/oauth/access_token", [
        'client_id'     => config('services.facebook.client_id'),
        'client_secret' => config('services.facebook.client_secret'),
        'redirect_uri'  => config('services.facebook.redirect'),
        'code'          => $code,
    ]);

    if ($response->failed()) {
        throw new \Exception('Échange de code échoué : ' . $response->json('error.message'));
    }

    return $response->json('access_token');
}

    private function formatDate(string $date): string
    {
   
        return (new \DateTime($date))->format(\DateTime::ATOM);
    }
}