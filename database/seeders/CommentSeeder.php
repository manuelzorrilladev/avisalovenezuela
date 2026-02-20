<?php

namespace Database\Factories;

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Obtenemos los primeros 5 usuarios (tus usuarios predeterminados)
        $users = User::take(5)->get();

        if ($users->count() === 0) {
            $this->command->error('No hay usuarios para asignar a los comentarios. Ejecuta primero el UserSeeder.');
            return;
        }

        // 2. Iteramos cada publicación
        Publication::all()->each(function ($publication) use ($users) {
            
            // Definimos un número aleatorio de comentarios totales para esta publicación (máximo 5)
            $totalMax = rand(1, 5);
            $countCreated = 0;
            $rootComments = [];

            // 3. Crear comentarios raíz (los que no tienen parent_id)
            // Creamos entre 1 y 3 raíces para dejar espacio a las respuestas
            $rootsToCreate = rand(1, min(3, $totalMax));

            for ($i = 0; $i < $rootsToCreate; $i++) {
                $comment = Comment::create([
                    'publication_id' => $publication->id,
                    'user_id'        => $users->random()->id,
                    'parent_id'      => null,
                    'content'        => fake()->sentence(rand(6, 15)),
                ]);
                
                $rootComments[] = $comment;
                $countCreated++;
            }

            // 4. Crear respuestas (anidados)
            // Si aún no llegamos al máximo aleatorio, creamos respuestas a los comentarios raíz
            while ($countCreated < $totalMax && !empty($rootComments)) {
                // Elegimos un comentario padre al azar de los que acabamos de crear
                $parent = $rootComments[array_rand($rootComments)];

                Comment::create([
                    'publication_id' => $publication->id,
                    'user_id'        => $users->random()->id, // Usuario al azar de los 5
                    'parent_id'      => $parent->id,          // Lo anidamos
                    'content'        => fake()->sentence(rand(5, 10)),
                ]);

                $countCreated++;
            }
        });

        $this->command->info('¡Comentarios creados exitosamente!');
    }
}