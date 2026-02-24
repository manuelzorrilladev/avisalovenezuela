<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'last_name' => 'Marketplace',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'id_card' => 'V-00000000',
            'phone' => '04120000000',
            'is_admin' => true
        ]);

        User::factory()->count(9)->create();
    }
}
