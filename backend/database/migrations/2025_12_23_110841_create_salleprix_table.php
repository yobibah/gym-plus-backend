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
        Schema::create('salleprix', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->float('montant_1',2)->default(0);
             $table->float('montant_2',2)->default(0);
              $table->float('montant_3',2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salleprix');
    }
};
