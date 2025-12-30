<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class depenses extends Model
{
    use SoftDeletes;
    protected $fillable = [


        'gerant_id',

        'salle_id',

        'motif',

        'montant',

        'date_depense'
    ];
}
