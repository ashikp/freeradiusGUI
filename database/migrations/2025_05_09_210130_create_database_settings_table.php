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
        Schema::create('database_settings', function (Blueprint $table) {
            $table->id();
            $table->string('driver')->default('sqlite'); // sqlite, mysql, pgsql, oracle
            $table->string('host')->nullable();
            $table->integer('port')->nullable();
            $table->string('database')->nullable();
            $table->string('username')->nullable();
            $table->string('password')->nullable();
            $table->string('charset')->default('utf8mb4');
            $table->string('collation')->default('utf8mb4_unicode_ci');
            $table->string('prefix')->default('');
            $table->boolean('is_active')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('database_settings');
    }
};
