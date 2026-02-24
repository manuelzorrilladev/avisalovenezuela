<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('publication_views', function (Blueprint $table) {
            $table->id();
            // Relación con la publicación
            $table->foreignId('publication_id')
                  ->constrained()
                  ->onDelete('cascade');

            // Metadata para filtrar bots o usuarios repetidos
            $table->string('ip', 45)->nullable();
            $table->text('user_agent')->nullable();

            // Guardamos el ID del usuario si está logueado (para saber quién nos visita)
            $table->foreignId('viewer_id')
                  ->nullable()
                  ->constrained('users')
                  ->onDelete('set null');

            // La fecha exacta de la vista
            $table->timestamp('viewed_at')->useCurrent();
            
            // Índice para que las gráficas por fecha sean rápidas
            $table->index('viewed_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('publication_views');
    }
};