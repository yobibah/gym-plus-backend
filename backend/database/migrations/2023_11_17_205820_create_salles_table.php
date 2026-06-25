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
        Schema::create('salles', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nom_salle');
            $table->string('pays_salle');
            $table->string('region_salle');
            $table->string('adresse_salle');
            $table->string('descriptions_salle')->nullable();
            $table->string('logo_salle')->nullable();
            $table->string('numero_salle')->nullable();
            $table->string('email_salle')->nullable();
            $table->foreignId('document_id')->constrained('documents');
            $table->boolean('active')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salles');
    }
};
