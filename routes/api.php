<?php

use App\Http\Controllers\PublicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// GENERAL ROUTES
Route::get('/publications/get-all', [PublicationController::class, 'getAll']);
// Route::get('/publications/get/{category}/{sub_category}', [PublicationController::class, 'getByCategory']);


Route::get('/api-health-test', function () {
    return response()->json(['status' => 200,'message' => 'API is working fine.']);
});



// =========
