<?php

namespace Database\Seeders;

use App\Models\Tag;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class CategoryHierarchySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $structure = [
            'Inmuebles' => [
                'Venta' => [
                    'Apartamentos',
                    'Casas',
                    'Locales',
                    'Establecimiento'
                ],
                'Alquiler' => [
                    'Apartamento',
                    'Habitación',
                    'Anexo',
                    'Local',
                    'Casa'
                ],
            ],
            'Vehículos' => [
                'Motos' => [],
                'Automóviles' => [],
                'Camionetas' => [],
                'Taxis' => [],
                'Pesados' => [],
                'Otros Vehículos' => [],
            ],
            'Empleos' => [
                'Empleos generales' => [],
                'Empleos especializados' => [],
                'Empleos de servicio doméstico' => [],
            ],
            'Servicios' => [
                'Servicios a domicilio' => [],
                'Servicios especializados' => [],
            ],
        ];

        foreach ($structure as $categoryName => $subCategoriesArray) {
            $category = Category::create([
                'name' => $categoryName,
                'slug' => Str::slug($categoryName),
            ]);

            foreach ($subCategoriesArray as $subCategoryName => $tagsArray) {
                $subCategory = SubCategory::create([
                    'category_id' => $category->id,
                    'name' => $subCategoryName,
                    'slug' => Str::slug($subCategoryName),
                ]);

                foreach ($tagsArray as $tagName) {
                    Tag::create([
                        'sub_category_id' => $subCategory->id,
                        'name' => $tagName,
                        'slug' => Str::slug($tagName),
                    ]);
                }
            }
        }

        $this->command->info('¡Éxito! Estructura de Inmuebles, Vehiculos, Empleos y Servicios cargada.');
    }
}
