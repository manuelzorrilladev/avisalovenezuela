<?php

namespace App\Http\Controllers;

use App\Models\Publication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


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

        if ($user->role == 'empleado') {
            return to_route('worker.dashboard');
        }

        return Inertia::render('Dashboard', [
            'publications' => $myPublications,
            'user'         => $user->only('id', 'name', 'email'),
        ]);
    }
    public function workerDashboard(Request $request)
    {
        $user = Auth::user();
        $filter = $request->query('filter', 'todos');
        $userId=$user->id;

        $myPublications = Publication::query()
            ->with(['category', 'images'])
            ->orderBy('status')
            ->when($filter === 'asignados', function ($query) use ($userId) {
                $query->where('worker_id', $userId);
            })
            ->latest()
            ->get()
            ->groupBy('status')
            ->toArray();
        $workers = User::where('role', 'empleado')->select(['id', 'name'])->get();

        if ($user->role == 'usuario') {
            return to_route('dashboard');
        }



        return Inertia::render('WorkerDashboard', [
            'publications' => $myPublications,
            'user'         => $user->only('id', 'name', 'email'),
            'workers' => $workers,
            'filters' => [
                'filterMode' => $filter,
            ],
        ]);
    }
}
