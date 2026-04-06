<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Publication;
use App\Models\SubCategory;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class PublicationController extends Controller
{



    public function getHome()
    {
        try {
            $homeData = Cache::remember('home_page_data', 600, function () {

                $baseQuery = Publication::query()
                    ->with(['category:id,name', 'images:id,publication_id,path'])
                    ->select('id', 'name', 'description', 'category_id', 'views', 'created_at', 'slug');

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

    public function getAllPaginated() {}

    public function getByCategory($category_slug, $sub_category_slug = null)
    {

        try {



            $category = Category::where('name', $category_slug)->firstOrFail();

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
                'publications' => Inertia::defer(fn() => $publications),
                'status' => session('status'),
                'title'       => $subCategory ? $subCategory->name : $category->name,
                'description' => "Explora las mejores publicaciones en {$category->name}" . ($subCategory ? " - {$subCategory->name}" : ""),
                'url'         => url()->current(),
                'currentFilters' => [
                    'category' => $category->name,
                    'sub_category' => $subCategory?->name
                ],
                'isEmpty' => $publications->isEmpty(),
            ]);
        } catch (\Exception $e) {
            Log::error("Error cargando el Home con Inertia: " . $e->getMessage());

            return Inertia::render('Error', [
                'message' => 'No pudimos cargar las secciones de la página.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ]);
        }
    }
    public function getDescription(Publication $publication)
    {
        try {
            $publication->load([
                'category:id,slug,name',
                'subCategory:id,slug,name',
                'images',
                'user:id,name,last_name,phone,created_at,state,city',
                'comments' => function ($query) {
                    $query
                        ->with(['user:id,name,last_name', 'replies.user:id,name,last_name'])
                        ->latest();
                }
            ]);

            return Inertia::render('Publication', [
                'results'     => $publication,
                'title'       => $publication->name,
                'description' => $publication->description,
                'url'         => url()->current()
            ]);
        } catch (\Exception $e) {
            Log::error("Error cargando la descripción: " . $e->getMessage());
            return Inertia::render('Error', ['message' => 'Error al cargar la publicación.']);
        }
    }



    public function publicationCreate()
    {

        $categories = Category::with(['subCategories.tags'])->get();
        return Inertia::render('PublicationForm', [
            'categories' => $categories

        ]);
    }


    public function publicationStore(Request $request)
    {


        $validated = $request->validate([
            'title' => 'required|string|min:5|max:100',
            'category_id'  => 'required|exists:categories,id',
            'sub_category_id' => 'required|exists:sub_categories,id',
            'item_type_id' => 'nullable|exists:item_types,id',
            'description' => 'required|string|min:20',
            'price' => 'required|numeric|min:0',
            'state' => 'required|string',
            'city' => 'required|string',
            'condition' => 'required|in:Nuevo,Usado,N/A',
            'images' => 'required|array|min:1|max:5',

            'specs.marca'       => 'required_if:actualCategory,vehiculos|string|max:50',
            'specs.año'         => 'required_if:actualCategory,vehiculos|numeric|digits:4',
            'specs.modelo'      => 'required_if:actualCategory,vehiculos|string|max:50',
            'specs.kilometraje' => 'required_if:actualCategory,vehiculos|numeric|min:0',
            'specs.transmision' => 'required_if:actualCategory,vehiculos|string',

            'specs.habitaciones'    => 'required_if:actualCategory,inmuebles|numeric|min:0',
            'specs.baños'           => 'required_if:actualCategory,inmuebles|numeric|min:0',
            'specs.area'            => 'required_if:actualCategory,inmuebles|numeric|min:1',
            'specs.estacionamiento' => 'required_if:actualCategory,inmuebles|numeric|min:0',

            'specs.tipo_empleo' => 'required_if:actualCategory,empleos|string',
            'specs.experiencia' => 'required_if:actualCategory,empleos|string',
            'specs.salario'     => 'required|string', // A veces es "A convenir"

            'specs.precio_minimo' => 'required_if:actualCategory,servicios|numeric|min:0',
            'specs.duracion'      => 'required_if:actualCategory,servicios|string',
        ]);



        try {

            return DB::transaction(function () use ($request, $validated) {
                $user = Auth::user();

                // 2. Crear la publicación principal
                // Usamos Str::slug() para generar el slug único
                $publication = Publication::create([
                    'user_id'         => $user->id,
                    'title'           => $validated['title'],
                    'slug'            => Str::slug($validated['title']) . '-' . Str::random(5), // Slug único
                    'category_id'     => $validated['category_id'],
                    'sub_category_id' => $validated['sub_category_id'],
                    'item_type_id'    => $validated['item_type_id'] ?? null,
                    'description'     => $validated['description'],
                    'price'           => $validated['price'],
                    'state'           => $validated['state'],
                    'city'            => $validated['city'],
                    'condition'       => $validated['condition'],
                    'specs'           => $request->specs,
                ]);

                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $index => $file) {
                        $path = $file->store("publications/{$publication->id}", 'public');

                        $publication->images()->create([
                            'path'       => $path,
                            'is_cover'   => $index === 0,
                            'sort_order' => $index
                        ]);
                    }
                }

                return redirect()->route('dashboard')->with('success', 'Publicación creada.');
            });
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Error al procesar: ' . $e->getMessage()]);
        }
    }
}
