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
        $users = User::take(7)->get();

        if ($users->count() === 0) {
            $this->command->error('No hay usuarios para asignar a los comentarios. Ejecuta primero el UserSeeder.');
            return;
        }

        Publication::all()->each(function ($publication) use ($users) {
            
            $totalMax = rand(1, 3);
            $countCreated = 0;
            $rootComments = [];

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

    
            while ($countCreated < $totalMax && !empty($rootComments)) {
                $parent = $rootComments[array_rand($rootComments)];

                Comment::create([
                    'publication_id' => $publication->id,
                    'user_id'        => $users->random()->id, 
                    'parent_id'      => $parent->id,          
                    'content'        => fake()->sentence(rand(5, 10)),
                ]);

                $countCreated++;
            }
        });

        $this->command->info('¡Comentarios creados exitosamente!');
    }
}