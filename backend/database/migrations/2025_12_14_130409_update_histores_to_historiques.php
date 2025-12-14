<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
    Schema::disableForeignKeyConstraints();

        Schema::table('historiques', function (Blueprint $table) {
            // supprimer l'ancienne FK (même si SQLite l'ignore, Laravel gère)
            $table->dropForeign(['gerant_id']);
        });

        Schema::table('historiques', function (Blueprint $table) {
            // recréer la FK vers la BONNE table (salles)
            $table->foreign('gerant_id')
                  ->references('id')
                  ->on('users')
                  ->cascadeOnDelete();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('historiques', function (Blueprint $table) {
            //
        });
    }
};
