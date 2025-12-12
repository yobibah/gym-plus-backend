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
        Schema::create('abonnements', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('transID');
            $table->enum('plan',['mensuel','trimestriel','annuel'])->default('mensuel');
            $table->float('montant',2);
            $table->dateTime('debut');
            $table->dateTime('fin');
            $table->foreignId('adherant_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('salle_id')->constrained('salles')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abonnements');
    }
};
