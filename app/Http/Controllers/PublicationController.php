<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use ZipArchive;

class PublicationController extends Controller
{

    public function HomeForm()
    {
        return Inertia::render('Welcome', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }
    public function HomeFormHandle(Request $request)
    {

        return redirect()->route('home');
    }
    public function getHome()
    {
        try {
            $homeData = Cache::remember('home_page_data', 600, function () {

                $baseQuery = Publication::query()
                    ->with(['category:id,name', 'images:id,publication_id,path'])
                    ->where('status', 'disponible')
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



    public function publicationCreate()
    {

        $categories = Category::all();
        return Inertia::render('DashboardForm', [
            'categories' => $categories

        ]);
    }

    public function publicationView(Publication $publication)
    {
        try {
            $publication->load([
                'category:id,slug,name',
                'subCategory:id,slug,name',
                'images',
            ]);
            $user = Auth::user();

            $workerId = $publication->worker_id;
            $worker = User::where('id', $workerId)->select(['id', 'name'])->get();




            return Inertia::render('PublicationView', [
                'publication'   => $publication,
                'worker'        => $worker,
                'user'          => $user->only('id', 'name', 'email'),


            ]);
        } catch (\Exception $e) {
            Log::error("Error cargando la descripción: " . $e->getMessage());
            return Inertia::render('Error', ['message' => 'Error al cargar la publicación.']);
        }
    }

 public function publicationDownload(int $id)
    {
        $publication = Publication::with('images')->findOrFail($id);

        if ($publication->images->isEmpty()) {
            return back()->with('error', 'Esta publicación no contiene imágenes para descargar.');
        }

        $slug = Str::slug($publication->title ?? "publicacion-{$publication->id}");
        $zipFileName = "imagenes-{$slug}.zip";
        
        $zipDirectory = storage_path('app/public/temp');
        if (!file_exists($zipDirectory)) {
            mkdir($zipDirectory, 0755, true);
        }

        $zipPath = "{$zipDirectory}/{$zipFileName}";

        $zip = new ZipArchive();

        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {
            foreach ($publication->images as $index => $image) {
                $imagePath = storage_path("app/public/{$image->path}");

                if (file_exists($imagePath)) {
                    $extension = pathinfo($imagePath, PATHINFO_EXTENSION);
                    
                    $internalName = "imagen-" . ($index + 1) . ".{$extension}";

                    $zip->addFile($imagePath, $internalName);
                }
            }
            
            $zip->close();
        } else {
            return back()->with('error', 'No se pudo generar el archivo comprimido.');
        }

        return response()->download($zipPath, $zipFileName)->deleteFileAfterSend(true);
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
            return Inertia::render('Error', ['message' => 'Error al cargar la publicación.','error'=>$e]);
        }
    }

    public function publicationStore(Request $request)
    {



        $validated = $request->validate([
            'title' => 'required|string|min:5|max:100',
            'description' => 'required|string|min:20',
            'state' => 'required|string',
            'city' => 'required|string',
            'images' => 'required|array|min:1|max:5'
        ]);


        try {
            return DB::transaction(function () use ($request, $validated) {
                $category = DB::table('categories')->where('slug', $request['category_type'])->get();
                $user = Auth::user();


                $publication = Publication::create([
                    'user_id'         => $user->id,
                    'name'            => $validated['title'],
                    'slug'            => Str::slug($validated['title']) . '-' . Str::random(5),
                    'category_id'     => $category[0]->id,
                    'description'     => $validated['description'],
                    'state'           => $validated['state'],
                    'city'            => $validated['city'],
                    'status'           => 'por realizar',
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

                return redirect()->route('dashboard')->with('success', 'Aviso enviado!.');
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

    public function assign(Request $request, int $id)
    {

        try {
            $request->validate([
                'worker_id' => 'nullable|exists:users,id',
            ]);

            $publication = Publication::findOrFail($id);

            $publication->update([
                'worker_id' => $request->worker_id,
            ]);

            return back()->with('success', 'Aviso asignado correctamente.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'No se pudo cambiar el estatus: ' . $e->getMessage()
            ])
                ->with('error', 'Hubo un error al asignar! Intenta nuevamente');
        }
    }

    public function toggleStatus(Request $request, int $id)
    {

        try {

            $request->validate([
                'status' => 'string',
            ]);
            $publication = Publication::findOrFail($id);
            $publication->update([
                'status' => $request->status
            ]);



            return back()->with('success', 'Estatus actualizado');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'No se pudo cambiar el estatus: ' . $e->getMessage()
            ])->with('error', 'Hubo un error al asignar! Intenta nuevamente');
        }
    }
}
