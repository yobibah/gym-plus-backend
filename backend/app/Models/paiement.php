<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class paiement extends Model
{
    protected $fillable = [
        "gerant_id",

        "moyen paiment",

        "status",

        "montant",

        "transId",

        "debut",

        "fin",

        "plan"
    ];




    public function gerant()
    {
        return $this->belongsTo(User::class, 'gerant_id', 'id');
    }



}
