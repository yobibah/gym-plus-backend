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
        Schema::create('coach_salle', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('salle_id')->constrained('salles')->cascadeOnDelete();
            $table->foreignId('coach_id')->constrained('coach')->cascadeOnDelete();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coach_salle');
    }
};
