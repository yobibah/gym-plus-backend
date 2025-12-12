<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('salles', function (Blueprint $table) {

            // D'abord supprimer la contrainte foreign key si elle existe
            if (Schema::hasColumn('salles', 'document_id')) {
                $table->dropForeign(['document_id']);
                $table->dropColumn('document_id');
            }
        });
    }

    public function down(): void
    {
        Schema::table('salles', function (Blueprint $table) {

            // Restaurer la colonne si on rollback
            $table->foreignId('document_id')->nullable()->constrained('document');
        });
    }
};
