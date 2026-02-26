<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Publication;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class PublicationController extends Controller
{

    public function getAll()
    {
        try {
            $homeData = Cache::remember('home_page_data', 600, function () {

                $baseQuery = Publication::query()
                    ->with(['category:id,name', 'images:id,publication_id,path'])
                    ->select('id', 'name', 'description', 'category_id', 'views', 'created_at');

                return [
                    'most_recent' => (clone $baseQuery)
                        ->orderBy('created_at', 'desc')
                        ->limit(9)
                        ->get(),

                    'most_viewed' => (clone $baseQuery)
                        ->orderBy('views', 'desc')
                        ->limit(9)
                        ->get(),

                    'vehicles' => (clone $baseQuery)
                        ->whereHas('category', fn($q) => $q->where('name', 'Vehículos'))
                        ->limit(6)
                        ->get(),

                    'services' => (clone $baseQuery)
                        ->whereHas('category', fn($q) => $q->where('name', 'Servicios'))
                        ->limit(6)
                        ->get(),
                ];
            });

            return Inertia::render('Welcome', [
                'canRegister' => Features::enabled(Features::registration()),
                'homeData' => Inertia::defer(fn() => $homeData),
                'status' => session('status'), // Opcional: para mensajes de éxito
            ]);
        } catch (\Exception $e) {
            Log::error("Error cargando el Home con Inertia: " . $e->getMessage());

            // En Inertia, si hay un error crítico, es mejor redirigir con un error 
            // o mostrar una página de error, pero para debug mantenemos esto:
            return Inertia::render('Error', [
                'message' => 'No pudimos cargar las secciones de la página.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ]);
        }
    }

    public function getByCategory($category_slug, $sub_category_slug = '')
    {

        try {
            $category = Category::where('name', $category_slug)->firstOrFail();

            // If there is a subcategory, we find it too
            $subCategory = $sub_category_slug
                ? SubCategory::where('name', $sub_category_slug)->first()
                : null;

            $cacheKey = "pubs_cat_{$category_slug}" . ($sub_category_slug ? "_sub_{$sub_category_slug}" : "");

            $publications = Cache::remember($cacheKey, 600, function () use ($category, $subCategory) {
                return Publication::query()
                    ->with(['category:id,slug,name', 'subCategory:id,slug,name', 'images:id,publication_id,path'])
                    ->where('category_id', $category->id)
                    ->when($subCategory, function ($q) use ($subCategory) {
                        return $q->where('sub_category_id', $subCategory->id);
                    })
                    ->latest()
                    ->get();
            });

            return Inertia::render('ByCategory', [
                'canRegister' => Features::enabled(Features::registration()),
                'categoryData' => Inertia::defer(fn() => $publications),
                'status' => session('status'),

                // Dynamic Props for SEO and UI
                'title'       => $subCategory ? $subCategory->name : $category->name,
                'description' => "Explora las mejores publicaciones en {$category->name}" . ($subCategory ? " - {$subCategory->name}" : ""),
                'url'         => url()->current(), // Generates the full current URL for canonical tag

                'currentFilters' => [
                    'category' => $category->name,
                    'sub_category' => $subCategory?->name
                ]
            ]);
        } catch (\Exception $e) {
            Log::error("Error cargando el Home con Inertia: " . $e->getMessage());

            return Inertia::render('Error', [
                'message' => 'No pudimos cargar las secciones de la página.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ]);
        }
    }
}
