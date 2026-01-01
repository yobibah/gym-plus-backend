<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class facture extends Model
{
    protected $table = "factures";

    protected $fillable = [
        "adherant_id","salle_id","Numero_facure","facture_url",
    ];

    public function facture(){
        return $this->belongsTo(Facture::class);
    }
}
