<?php

namespace Database\Seeders;

use Database\Seeders\CategoryHierarchySeeder;
use Database\Seeders\CommentSeeder;
use Database\Seeders\PublicationImageSeeder;
use Database\Seeders\PublicationSeeder;
use Database\Seeders\PublicationViewSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            CategoryHierarchySeeder::class,
            UserSeeder::class,
            PublicationSeeder::class,
            CommentSeeder::class,
            PublicationImageSeeder::class,
            PublicationViewSeeder::class
        ]);
    }
}
