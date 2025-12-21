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
        Schema::create('activites', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nom_activite');
            $table->string('descriptions');
            $table->string('images_activte')->nullable();
            $table->date('date_activite');
            $table->time('heure_activite');
            $table->enum('status', ['publie', 'attente', 'annule'])->default('attente');
            $table->foreignId('gerant_id')->constrained('users')->onDelete('cascade');
            $table->softDeletes();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activites');
    }
};
