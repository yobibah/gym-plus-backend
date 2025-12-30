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
        Schema::table('depenses', function (Blueprint $table) {

            if (Schema::hasColumn('depenses', 'salle_id')) {
                $table->dropForeign(['salle_id']); 
                $table->dropColumn('salle_id');
            }

            if (Schema::hasColumn('depenses', 'gerant_id')) {
                $table->dropForeign(['gerant_id']); 
                $table->dropColumn('gerant_id');
            }

       

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('depenses', function (Blueprint $table) {
            //
        });
    }
};
