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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->enum('type',['cni','passport']);
            $table->string('numero_identite');
            $table->string('recto');
            $table->string('verso');
            $table->enum('status',['attente','verifie','rejette']);
            $table->foreignId('salle_id')->constrained('salles');
            $table->dateTime('date_soumission');
           $table->dateTime('date_verification');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
