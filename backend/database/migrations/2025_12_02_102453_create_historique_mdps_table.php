<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('historique_mdps', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('gerant_id')->constrained('gerant')->onDelete('cascade');
            $table->string('mdp');
            $table->datetime('date_ajout')->default(Carbon::now());
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historique_mdps');
    }
};
