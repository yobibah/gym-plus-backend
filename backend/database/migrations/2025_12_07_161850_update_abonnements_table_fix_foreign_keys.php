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
    Schema::table('abonnements', function (Blueprint $table) {
        $table->dropForeign(['salle_id']);
        $table->foreign('salle_id')->references('id')->on('salles')->onDelete('cascade');

        $table->dropForeign(['adherant_id']);
        $table->foreign('adherant_id')->references('id')->on('users')->onDelete('cascade');
    });
}

public function down(): void
{
    Schema::table('abonnements', function (Blueprint $table) {
        $table->dropForeign(['salle_id']);
        $table->foreign('salle_id')->references('id')->on('salle')->onDelete('cascade');

        $table->dropForeign(['adherant_id']);
        $table->foreign('adherant_id')->references('id')->on('user')->onDelete('cascade');
    });
}

};
