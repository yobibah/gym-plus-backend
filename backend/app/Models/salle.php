<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class salle extends Model
{
    protected $fillable = [
        'nom_salle',

        'pays_salle',

        "region_salle",

        "adresse_salle",

        "descriptions_salle",

        "logo_salle",

        "numero_salle",

        "email_salle",
        'gerant_id'

    ];




public function Gerant()
{
    return $this->belongsTo(Salle::class, 'gerant_id');
}


}
