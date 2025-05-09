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
        Schema::create('authentication_logs', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('client_ip');
            $table->string('nas_ip');
            $table->string('nas_identifier')->nullable();
            $table->string('auth_type');
            $table->string('status');
            $table->text('reply_message')->nullable();
            $table->json('request_attributes')->nullable();
            $table->json('reply_attributes')->nullable();
            $table->timestamp('auth_time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('authentication_logs');
    }
};
