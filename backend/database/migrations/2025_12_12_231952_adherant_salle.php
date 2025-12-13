<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('adherent_salle', function (Blueprint $table) {
            $table->id();

            $table->foreignId('adherent_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->foreignId('salle_id')
                ->constrained('salles')
                ->onDelete('cascade');

            $table->date('date_inscription')->nullable();
            $table->string('statut')->default('actif');

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
