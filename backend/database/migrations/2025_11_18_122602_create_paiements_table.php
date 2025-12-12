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
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('gerant_id')->constrained('users');
            $table->string('moyen paiment');
            $table->enum('status',['attente','echoue','reussi']);
            $table->float('montant',2);
            $table->string('transId');
            $table->dateTime('debut');
            $table->dateTime('fin');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
