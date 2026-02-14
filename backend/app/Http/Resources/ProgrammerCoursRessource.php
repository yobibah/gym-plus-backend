<?php

namespace App\Http\Resources;

use App\Models\Coach;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgrammerCoursRessource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'horaire' => explode(',', $this->horaire),

            'adherent' => function () {
                $ids = explode(',', $this->adherent_id);
                $users = User::whereIn('id', $ids)->get();
                return $users->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'nom' => $user->nom,
                        'prenom' => $user->prenom,
                     
                    ];
                });
            },

            'coach' => function () {
                $coach = coach::find($this->coach_id);
                return $coach ? new CoachRessource($coach) : $this->coach_id;
            },

            'jours' => explode(',', $this->jours)
        ];
    }
}
