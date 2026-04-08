<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Publication;
use App\Models\SubCategory;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
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
                    ->where('status','disponible')
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



    public function publicationEdit(Publication $publication)
    {
        try {
            $publication->load([
                'category:id,slug,name',
                'subCategory:id,slug,name',
                'images',
            ]);
            $categories = Category::with(['subCategories.tags'])->get();


            return Inertia::render('PublicationForm', [
                'results'     => $publication,
                'categories' => $categories,
                'isEditing'   => true

            ]);
        } catch (\Exception $e) {
            Log::error("Error cargando la descripción: " . $e->getMessage());
            return Inertia::render('Error', ['message' => 'Error al cargar la publicación.']);
        }
    }

    public function publicationStore(Request $request)
    {


        $validated = $request->validate([
            'title' => 'required|string|min:5|max:100',
            'category'  => 'required|exists:categories,id',
            'sub_category' => 'required|exists:sub_categories,id',
            'item_type' => ['nullable', 'required_if:category,1|exists:tags,id'],
            'description' => 'required|string|min:20',
            'state' => 'required|string',
            'city' => 'required|string',
            'condition' => 'required|in:nuevo,usado,N/A',
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
            'specs.salario'     => 'required_if:actualCategory,empleos|string',

            'specs.precio_minimo' => 'required_if:actualCategory,servicios|numeric|min:0',
            'specs.duracion'      => 'required_if:actualCategory,servicios|string',
        ]);


        try {

            return DB::transaction(function () use ($request, $validated) {
                $user = Auth::user();

                $tag_validate = $validated['category'] == 1 ? $validated['item_type'] : null;

                $publication = Publication::create([
                    'user_id'         => $user->id,
                    'name'            => $validated['title'],
                    'slug'            => Str::slug($validated['title']) . '-' . Str::random(5), // Slug único
                    'category_id'     => $validated['category'] ?? 0,
                    'sub_category_id' => $validated['sub_category'] ?? 0,
                    'tag_id'          => $tag_validate,
                    'description'     => $validated['description'],
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
                            'is_featured'   => $index === 0,
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

    public function publicationUpdate(Request $request, Publication $publication)
    {

        $validated = $request->validate([
            'title' => 'required|string|min:5|max:100',
            'category'  => 'required|exists:categories,id',
            'sub_category' => 'required|exists:sub_categories,id',
            'item_type' => ['nullable', 'required_if:category,1|exists:tags,id'],
            'description' => 'required|string|min:20',
            'state' => 'required|string',
            'city' => 'required|string',
            'condition' => 'required|in:nuevo,usado,N/A',
            'images' => 'nullable|array|max:5',
            'existing_images' => 'nullable|array',

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
            'specs.salario'     => 'required_if:actualCategory,empleos|string',

            'specs.precio_minimo' => 'required_if:actualCategory,servicios|numeric|min:0',
            'specs.duracion'      => 'required_if:actualCategory,servicios|string',
        ]);


        try {
            return DB::transaction(function () use ($request, $validated, $publication) {

                $tag_validate = $validated['category'] == 1 ? $validated['item_type'] : null;

                $publication->update([
                    'name'            => $validated['title'],
                    'category_id'     => $validated['category'],
                    'sub_category_id' => $validated['sub_category'],
                    'tag_id'          => $tag_validate,
                    'description'     => $validated['description'],
                    'state'           => $validated['state'],
                    'city'            => $validated['city'],
                    'condition'       => $validated['condition'],
                    'specs'           => $request->specs,
                ]);

                $keepItems = $request->input('existing_images', []);

                $cleanPaths = array_values(array_filter(array_map(function ($url) {
                    $path = parse_url($url, PHP_URL_PATH);
                    $relative = str_replace('/storage/', '', $path);
                    return ltrim($relative, '/');
                }, $keepItems)));

                $imagesToDelete = $publication->images()
                    ->whereNotIn('path', $cleanPaths)
                    ->get();

                foreach ($imagesToDelete as $img) {
                    Storage::disk('public')->delete($img->path);
                    $img->delete();
                }

                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $file) {
                        $path = $file->store("publications/{$publication->id}", 'public');
                        $publication->images()->create([
                            'path' => $path,
                            'is_featured' => false,
                            'sort_order' => 99
                        ]);
                    }
                }


                $publication->refresh();
                $allCurrentImages = $publication->images()->get();

                foreach ($cleanPaths as $index => $path) {
                    $allCurrentImages->where('path', $path)->first()?->update([
                        'is_featured' => $index === 0,
                        'sort_order' => $index
                    ]);
                }

                $newImages = $publication->images()->whereNotIn('path', $cleanPaths)->get();
                foreach ($newImages as $index => $image) {
                    $newOrder = count($cleanPaths) + $index;
                    $image->update([
                        'is_featured' => $newOrder === 0,
                        'sort_order' => $newOrder
                    ]);
                }

                return redirect()->route('dashboard')->with('success', 'Publicación actualizada correctamente.');
            });
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Error al actualizar: ' . $e->getMessage()]);
        }
    }



    public function toggleStatus(Publication $publication)
    {

        try {

            $nuevoStatus = ($publication->status === 'disponible')
                ? 'no disponible'
                : 'disponible';

            $publication->update([
                'status' => $nuevoStatus
            ]);

            $mensaje = $nuevoStatus === 'disponible'
                ? 'La publicación ahora está visible para todos.'
                : 'La publicación ha sido pausada correctamente.';
                

            return redirect()
                ->route('dashboard')
                ->with('success', 'Publicación actualizada')
                ->with('description', $mensaje);
                
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'No se pudo cambiar el estatus: ' . $e->getMessage()
            ]);
        }
    }
}
