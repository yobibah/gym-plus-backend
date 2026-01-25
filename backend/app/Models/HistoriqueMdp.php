<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoriqueMdp extends Model
{
    //
    protected $table ='historique_mdp';
    protected $fillable = [
        'gerant_id',
        'mdp',
        'date_ajout'
    ];
}
