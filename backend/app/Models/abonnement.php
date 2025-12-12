<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class abonnement extends Model
{
    protected $fillable = [
        "created_at",

        "updated_at",

        "transID",

        "plan",

        "montant",

        "debut",

        "fin",

        "adherant_id",

        "salle_id",
    ];




    public function adherant()
    {
        return $this->belongsTo(User::class, 'adherant_id', 'id');
    }

}
