<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

use App\Models\Publication;

use App\Models\SubCategory;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use Laravel\Fortify\Features;


class UserController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

   
        $myPublications = Publication::query()
            ->where('user_id', $user->id)
            ->with(['category', 'images']) 
            ->latest()
            ->get();

        return Inertia::render('Dashboard', [
            'publications' => $myPublications,
            'user'         => $user->only('id', 'name', 'email'), 
        ]);
    }
}
