<?php

use App\Http\Controllers\PublicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// GENERAL ROUTES
Route::get('/publications/get-all', [PublicationController::class, 'getAll']);

Route::get('/publications/category/{categorySlug}/{subCategory?}', [PublicationController::class, 'getByCategory']);





// =========
