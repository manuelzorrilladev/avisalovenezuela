<?php

use App\Http\Controllers\PublicationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [PublicationController::class, 'getHome'])->name('home');

Route::get(
    '/anuncios/{category_slug?}/{sub_category_slug?}', [PublicationController::class,'getByCategory']
)->name('search-category');


Route::get(
    '/anuncio/{publication:slug}', [PublicationController::class,'getDescription']
)->name('view-description');

Route::get('dashboard', [UserController::class, 'dashboard']
)->middleware(['auth', 'verified'])->name('dashboard');


Route::fallback(function (){
    return Inertia::render('Error', [
            'canRegister' => Features::enabled(Features::registration())
        ]);
    });

require __DIR__ . '/settings.php';
