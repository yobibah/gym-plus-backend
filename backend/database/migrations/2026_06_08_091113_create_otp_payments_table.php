<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('otp_payments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            // paiement
            $table->string('reference')->unique();
            $table->string('provider')->nullable();
            $table->decimal('amount', 10, 2)->nullable();

            // OTP
            $table->string('otp_code')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamp('otp_expires_at')->nullable();

            // statut paiement
            $table->enum('status', ['pending', 'success', 'failed'])->default('pending');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('otp_payments');
    }
};