<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class salleprix extends Model
{
    protected $table = 'salleprix';

    protected $fillable = [
        'gerant_id',
        'salle_id',
        'montant_1',
        'montant_2',
        'montant_3',


    ];
}
