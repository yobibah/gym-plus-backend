<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class historique extends Model
{
    protected $fillable = [
        'date_connexion',

        'gerant_id'


    ];

    protected $hidden =[
    'created_at',
    'updated_at'];
}
