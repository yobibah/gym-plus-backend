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
        Schema::create('programer_cours', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('salle_id')->constrained('salles')->cascadeOnDelete();
            $table->foreignId('cours_id')->constrained('cours')->cascadeOnDelete();
            $table->foreignId('coach_id')->constrained('coach')->cascadeOnDelete();
            $table->string('jours');
            $table->string('horaire');
            $table->boolean('permannent')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programer_cours');
    }
};
