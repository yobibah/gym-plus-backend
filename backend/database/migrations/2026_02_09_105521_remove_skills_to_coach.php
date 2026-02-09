<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('coach', function (Blueprint $table) {

            if (Schema::hasColumn('coach', 'skills')) {

        
                $table->dropForeign(['skills']);

     
                $table->dropColumn('skills');
            }
        });
    }

    public function down(): void
    {
        Schema::table('coach', function (Blueprint $table) {

    
            $table->unsignedBigInteger('skills')->nullable();

            $table->foreign('skills')
                  ->references('id')
                  ->on('skills')
                  ->onDelete('set null');
        });
    }
};
