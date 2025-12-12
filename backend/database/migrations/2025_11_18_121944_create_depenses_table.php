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
        Schema::create('depenses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('gerant_id')->constrained('gerant');
            $table->foreignId('salle_id')->constrained('salle');
            $table->string('motif');
            $table->float('montant', 2);
            $table->datetime('date_depense');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('depenses');
    }
};
