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
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'id_card' => 'V-00000000',
            'phone' => '04120000000',
            'birth_date' => '1990-01-01',
            'role'=>'admin',
            'city' => 'Caracas',
            'state' => 'Distrito Capital',

        ]);

        User::factory()->count(9)->create();
    }
}
