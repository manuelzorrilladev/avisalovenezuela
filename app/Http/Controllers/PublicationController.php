<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class PublicationController extends Controller
{
    public function getAll()
    {
        try {
            // Cacheamos todo el bloque de datos del Home por 10 minutos (600 seg)
            $homeData = Cache::remember('home_page_data', 600, function () {

                // Relaciones comunes para todas las consultas
                $baseQuery = Publication::query()
                    ->with(['category:id,name', 'images:id,publication_id,path'])
                    ->select('id', 'name', 'description', 'category_id', 'views', 'created_at');

                return [
                    // 1. Más recientes
                    'most_recent' => (clone $baseQuery)
                        ->orderBy('created_at', 'desc')
                        ->limit(8)
                        ->get(),

                    // 2. Más vistos (Populares)
                    'most_viewed' => (clone $baseQuery)
                        ->orderBy('views', 'desc')
                        ->limit(8)
                        ->get(),

                    // 3. Específicos por categoría: Vehículos
                    'vehicles' => (clone $baseQuery)
                        ->whereHas('category', fn($q) => $q->where('name', 'Vehículos'))
                        ->limit(4)
                        ->get(),

                    // 4. Específicos por categoría: Servicios
                    'services' => (clone $baseQuery)
                        ->whereHas('category', fn($q) => $q->where('name', 'Servicios'))
                        ->limit(4)
                        ->get(),
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $homeData
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
