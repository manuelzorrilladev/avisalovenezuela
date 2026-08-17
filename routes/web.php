<?php

use App\Http\Controllers\PublicationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [PublicationController::class, 'HomeForm'])->name('home');


Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {

    Route::get('/', [UserController::class, 'dashboard'])->name('dashboard');
    Route::get('/w/', [UserController::class, 'workerDashboard'])->name('worker.dashboard');

    Route::controller(PublicationController::class)->group(function () {

        Route::get('/publicacion/crear', 'publicationCreate')->name('publicacion.create');
        Route::middleware(['owner'])->get('/publicacion/{publication:id}', 'publicationView')->name('publicacion.view');
        Route::middleware(['owner'])->get('/publicacion/{id}/files', 'publicationDownload')->name('publicacion.download');
        
        Route::post('/publicacion', 'publicationStore')->name('publicacion.store');
        
        
        Route::patch('/publicacion/{id}/asignar', 'assign')->name('publicacion.assign'); 
        Route::patch('/publicacion/{id}/status', 'toggleStatus')->name('publicacion.status');
    });
});

Route::fallback(function () {
    return Inertia::render('Error', [
        'canRegister' => Features::enabled(Features::registration()),
        'status' => 404
    ]);
});



require __DIR__ . '/settings.php';
