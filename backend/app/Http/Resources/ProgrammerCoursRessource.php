<?php

namespace App\Http\Resources;

use App\Models\coach;
use App\Models\cours;
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
        $gerant = $request->user();
     

        // recuprer le coach et la comptence qui va avec ses skills
        $coach = coach::find($this->coach_id);
        $coachData = $coach ? $coach?->only(['id', 'nom', 'prenom']) : null;
        $skills = $coach?->Skills()->pluck('comptence');
        $data = [
            'coach' => $coachData,
            'skills' => $skills
        ];

        // recuperer les adherents
           $adh = $this->adherent_id;
                $ids = explode(',', $adh);
                $users = User::whereIn('id', $ids)->get();
                $adherent =  $users->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'nom' => $user->name,
                        'prenom' => $user->prenom,

                    ];
                });



    // recuperer le cours

    $cours =  cours::where('id',$this->cours_id)->where('salle_id',$gerant->salle->id);
    $nomCours = $cours?->pluck('nom_cours');

        return [
            'cours'=>$nomCours,
            'horaire' => explode(',', $this->horaire),

            'adherent' => $adherent,

            'coach' => $data ?? $this->coach_id,

            'jours' => explode(',', $this->jours)
        ];
    }
}
