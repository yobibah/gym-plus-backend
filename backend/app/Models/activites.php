<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

class activites extends Model
{
    use SoftDeletes, Notifiable;

    protected $fillable = [
        "nom_activite",

        "descriptions",

        "images_activte",

        "date_activite",

        "heure_activite",

        "status",

        "gerant_id",
    ];

    //

    public function Gerant()
    {
        return $this->belongsTo(User::class, 'gerant_id');
    }

    public function getImageUrlAttribute()
    {
        return asset('storage/documents/' . $this->images_activte);
    }

    public function Ispast(): bool
    {
        return Carbon::parse($this->date_activite)->isPast();
    }

    


}
