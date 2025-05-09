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
        Schema::create('authentication_methods', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('type'); // e.g., 'pap', 'chap', 'mschap', 'eap'
            $table->string('module'); // e.g., 'ldap', 'sql', 'files'
            $table->json('config')->nullable(); // For storing method-specific configuration
            $table->boolean('is_active')->default(true);
            $table->integer('priority')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('authentication_methods');
    }
};
