<?php

use App\Http\Controllers\PublicationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [PublicationController::class, 'getAll'])->name('home');

Route::get(
    '/anuncios/{category_slug}/{sub_category_slug?}',
    function () {
        return Inertia::render('ByCategory', [
            'canRegister' => Features::enabled(Features::registration())
        ]);
    }
)->name('search-category');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::fallback(function (){
    return Inertia::render('Error', [
            'canRegister' => Features::enabled(Features::registration())
        ]);
    });

require __DIR__ . '/settings.php';
