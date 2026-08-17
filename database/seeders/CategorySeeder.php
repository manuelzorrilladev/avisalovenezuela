<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $structure = [
           'Alquiler',
            'Venta',
            'Compra',
            'Empleo',
            'Servicios',
            'Búsqueda de Personal',
            'Valla Digital',
            'Obituario',
            'Convocatoria',
            'Otros'
        ];

        foreach ($structure as $categoryName) {
            $category = Category::create([
                'name' => $categoryName,
                'slug' => Str::slug($categoryName),
            ]);

           
        }

        $this->command->info('¡Éxito! Estructura de Categorias cargada.');
    }
}
