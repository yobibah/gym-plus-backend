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
        Schema::table('reabonnemen_trace', function (Blueprint $table) {
            $table->integer('adherant_id');
            $table->integer('salle_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reabonnemen_trace', function (Blueprint $table) {
            //
        });
    }
};
