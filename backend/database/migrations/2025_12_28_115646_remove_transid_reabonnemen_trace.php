<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reabonnemen_trace', function (Blueprint $table) {
            // Supprimer les colonnes si elles existent
            if (Schema::hasColumn('reabonnemen_trace', 'adherant_id')) {
                $table->dropForeign(['adherant_id']); // Supprimer la contrainte étrangère
                $table->dropColumn('adherant_id');   // Supprimer la colonne
            }

            if (Schema::hasColumn('reabonnemen_trace', 'salle_id')) {
                $table->dropForeign(['salle_id']); 
                $table->dropColumn('salle_id');
            }
        });
    }

    public function down(): void
    {
        Schema::table('reabonnemen_trace', function (Blueprint $table) {
            // Restaurer les colonnes supprimées
            $table->foreignId('adherant_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('salle_id')->constrained('salles')->onDelete('cascade');
        });
    }
};
