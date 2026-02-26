<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
                'homeData' => Inertia::defer(fn () => $homeData),
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
            $query = Publication::query()
                ->with(['category:id,slug', 'subCategory:id,slug', 'images:id,publication_id,path'])
                ->whereHas('category', fn($q) => $q->where('name', $category_slug))
                ->when($sub_category_slug, function ($q) use ($sub_category_slug) {
                    return $q->whereHas('subCategory', fn($sq) => $sq->where('name', $sub_category_slug));
                })
                ->get();



            return response()->json([
                'success' => true,
                'data' => $query
            ], 200);
        } catch (\Exception $e) {
            Log::error("Error cargando el Home: " . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'No pudimos cargar las secciones de la página.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}
