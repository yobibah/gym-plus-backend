<?php 

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PaysApiService
{
    public $api;
    public string $url;

    public string $paysurl;

    public function __construct()
    {
        $this->api = env('AAAPIS_TOKEN');
        $this->paysurl ='https://countriesnow.space/api/v0.1/countries/cities';

    }

    public function init(string $method, string $country = '', string $url = '')
    {
        $endpoint = $url ?: $this->url;

        $response = Http::withHeaders([
            'Authorization' => 'Token ' . $this->api,
            'Content-Type'  => 'application/json',
        ])->$method($endpoint, $country ? ['country' => $country] : []);

        return $response;
    }

    public function Allcountrie()
    {
        $this->url = 'https://aaapis.com/api/v1/info/countries/';
        $response  = $this->init('get');

        return response()->json($response->json(), 200);
    }


    public function GetbyName(string $name, string $method = 'post')
    {
        $this->url = 'https://aaapis.com/api/v1/info/country/';
        $response  = $this->init($method, $name);

        return response()->json($response->json(), 200);
    }

    public function CountrieName(){
           $this->url = 'https://aaapis.com/api/v1/info/countries/';
        $response  = $this->init('get');


        $countries = collect($response->json()['countries'] ?? [])
        ->pluck('name')
        ->values();

        return response()->json($countries, 200);
    }

    public function Mesvilles(string $pays){
         $response = $this->init('post',$pays,$this->paysurl);

         return response()->json($response->json());
    }
}
