<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HistoriqueResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'date' => $this->date_connexion,
            'depuis' => Carbon::parse($this->date_connexion)->diffForHumans(),
            //    'appareil'=>$this->device,
            //    'browser'=>$this->browser
        ];
    }
}
