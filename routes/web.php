<?php

use App\Http\Controllers\PublicationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [PublicationController::class, 'getHome'])->name('home');

Route::get(
    '/anuncios/{category_slug?}/{sub_category_slug?}',
    [PublicationController::class, 'getByCategory']
)->name('search-category');




Route::get(
    '/anuncio/{publication:slug}',
    [PublicationController::class, 'getDescription']
)->name('view-description');

// Route::get(
//     'dashboard',
//     [UserController::class, 'dashboard']
// )->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('dashboard/publicacion/',[PublicationController::class,'publication'])->name('publicacion');

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
    
    Route::get('/', [UserController::class, 'dashboard'])->name('dashboard');

    Route::controller(PublicationController::class)->group(function () {
        
        Route::get('/publicacion/crear', 'publicationCreate')->name('publicacion.create');
        
        Route::post('/publicacion', 'publicationStore')->name('publicacion.store');
        
        Route::get('/publicacion/{publication}/editar', 'publicationEdit')->name('publicacion.edit');
        
        Route::put('/publicacion/{publication}', 'publicationUpdate')->name('publicacion.update');
        
        Route::patch('/publicacion/{publication}/status', 'toggleStatus')->name('publicacion.status');
        
        // Eliminar (opcional, si no usas solo desactivar)
        // Route::delete('/publicacion/{publication}', 'destroy')->name('publicacion.destroy');
    });

});

Route::fallback(function () {
    return Inertia::render('Error', [
        'canRegister' => Features::enabled(Features::registration())
    ]);
});

require __DIR__ . '/settings.php';
