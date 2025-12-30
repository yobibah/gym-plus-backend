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
        Schema::create('reabonnemen_trace', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('abonnement_id')->constrained('abonnements')->cascadeOnDelete();
            $table->string('transId');
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reabonnemen_trace');
    }
};
