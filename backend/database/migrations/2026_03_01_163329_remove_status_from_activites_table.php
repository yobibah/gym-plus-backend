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
        Schema::table('activites', function (Blueprint $table) {
                        if (Schema::hasColumn('activites', 'status')) {

        
                $table->dropForeign(['status']);

     
                $table->dropColumn('status');
            }

                $table->enum('status', ['publie', 'attente', 'annule','passe'])->default('attente');
    
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('activites', function (Blueprint $table) {
            //
        });
    }
};
