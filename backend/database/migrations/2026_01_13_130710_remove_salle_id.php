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
        Schema::table('coach_salle', function (Blueprint $table) {
            if (Schema::hasColumn('coach_salle', 'gerant_id')) {
                $table->dropForeign(['gerant_id']); 
                $table->dropColumn('gerant_id');
                $table->foreignId('coach_id')->constrained('coach')->cascadeOnDelete();
            }
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('coach_salle', function (Blueprint $table) {
            //
        });
    }
};
