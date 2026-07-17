<?php

namespace Database\Seeders;

use Database\Seeders\CategorySeeder;
use Database\Seeders\PublicationImageSeeder;
use Database\Seeders\PublicationSeeder;
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
            UserSeeder::class,
            CategorySeeder::class,
            PublicationSeeder::class,
            PublicationImageSeeder::class,
        ]);
    }
}
