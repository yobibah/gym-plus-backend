<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('paiements', function (Blueprint $table) {
            // Supprimer l'ancienne clé étrangère si elle existe
            $table->dropForeign(['gerant_id']);

            // Re-créer la clé étrangère correctement vers users
            $table->foreign('gerant_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('paiements', function (Blueprint $table) {
            $table->dropForeign(['gerant_id']);
            // Optionnel : remettre l'ancienne clé étrangère vers 'user' si nécessaire
            $table->foreign('gerant_id')
                  ->references('id')
                  ->on('user')
                  ->onDelete('cascade');
        });
    }
};
