<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class salle extends Model
{
    protected $fillable = [
        'nom_salle',
        'pays_salle',
        'region_salle',
        'adresse_salle',
        'descriptions_salle',
        'logo_salle',
        'numero_salle',
        'email_salle',
        'gerant_id',
        'active',
        'updated_at',
    ];

    // ✅ gerant_id est dans la table salles
    public function gerant(): BelongsTo
    {
        return $this->belongsTo(User::class, 'gerant_id', 'id');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class, 'salle_id', 'id');
    }

    public function adherents(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'adherent_salle', 'salle_id', 'adherent_id')
            ->withTimestamps();
    }

    public function adherentsActif()
    {
        return $this->belongsToMany(User::class, 'adherent_salle', 'salle_id', 'adherent_id')
            ->whereHas('abonnements', fn($q) => $q->where('actif', 1))
            ->get();
    }

    public function adherentsExpirer()
    {
        return $this->belongsToMany(User::class, 'adherent_salle', 'salle_id', 'adherent_id')
            ->whereHas('abonnements', function($q) {
                $q->where('actif', 0)
                  ->whereDate('fin', '<', Carbon::today());
            })->get();
    }

    public function bientotExpirer()
    {
        return $this->belongsToMany(User::class, 'adherent_salle', 'salle_id', 'adherent_id')
            ->whereHas('abonnements', function($q) {
                $q->whereBetween('fin', [
                    now()->startOfDay(),
                    now()->addDays(7)->endOfDay()
                ])->where('actif', 1);
            })->with(['abonnements']);
    }
}