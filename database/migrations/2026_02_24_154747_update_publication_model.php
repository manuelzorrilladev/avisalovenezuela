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
        Schema::table('publications', function (Blueprint $table) {
            // Índices para búsquedas geográficas y de estado
            $table->index('status');
            $table->index('city');
            $table->index('state');
            $table->index('published_at');

            // Índice para ordenar por vistas si decides usar el contador simple
            $table->index('views');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
