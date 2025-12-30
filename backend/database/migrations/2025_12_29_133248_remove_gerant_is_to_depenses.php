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
                 if (Schema::hasColumn('depenses', 'gerant_is')) {
                $table->dropForeign(['gerant_is']); 
                $table->dropColumn('gerant_is');
            }
                        $table->foreignId('gerant_id')->constrained('users')->cascadeOnDelete();
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
