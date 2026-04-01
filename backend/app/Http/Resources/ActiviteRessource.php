<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActiviteRessource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        Carbon::setLocale('fr');

        return [
            'id' => $this->id,
            'ispast' => $this->Ispast(),

            "nom_activite" => $this->nom_activite,

            "descriptions" => $this->descriptions,

            "images_activte" => $this->images_activte,

            "date_activite" => Carbon::parse($this->date_activite)->isoFormat('dddd D MMMM YYYY'),

            "heure_activite" => $this->heure_activite,

            "status" => $this->status,

            "gerant_id" => $this->gerant_id,
        ];
    }
}
