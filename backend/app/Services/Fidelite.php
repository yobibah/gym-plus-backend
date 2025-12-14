<?php 
namespace App\Services;

use App\Models\salle;
use App\Models\User;

final class Fidelite 
{
    public function __construct(public User $gerant,public User $adherant, private salle $salle){}

    // pointAM = nombre de points par abonnement mensuel
    // pointRG = nombre de point du a la regularite
    public function FormuleFidelite(int $pointAM, int $pointRG){
        // un mois d'abonnement = 10 points
        // 100 points = 1 séance gratuite ou 10% de réduction
       // Bonus points pour régularité (ex : 3 semaines sans absence) = 20 pts

       
    }

    protected function FideliserClient(){

    }

    protected function DefideliserClient(){

    }

    protected function Pointclient(){

    }
    
}
