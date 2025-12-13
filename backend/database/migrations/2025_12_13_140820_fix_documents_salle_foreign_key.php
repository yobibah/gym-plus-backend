<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // SQLite : il faut recréer la table
        Schema::disableForeignKeyConstraints();

        Schema::table('documents', function (Blueprint $table) {
            // supprimer l'ancienne FK (même si SQLite l'ignore, Laravel gère)
            $table->dropForeign(['salle_id']);
        });

        Schema::table('documents', function (Blueprint $table) {
            // recréer la FK vers la BONNE table (salles)
            $table->foreign('salle_id')
                  ->references('id')
                  ->on('salles')
                  ->cascadeOnDelete();
        });

        Schema::enableForeignKeyConstraints();
    }

    public function down(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::table('documents', function (Blueprint $table) {
            $table->dropForeign(['salle_id']);
        });

        Schema::table('documents', function (Blueprint $table) {
            // rollback vers l'ancienne table (si elle existait)
            $table->foreign('salle_id')
                  ->references('id')
                  ->on('salle');
        });

        Schema::enableForeignKeyConstraints();
    }
};
