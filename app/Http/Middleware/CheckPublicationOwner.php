<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckPublicationOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
    */
    public function handle(Request $request, Closure $next): Response
    {
       /** @var \App\Models\User $user */
        $user = Auth::user();
        $publication = $request->route('publication');

        if ($user && $user->is_admin) {
            return $next($request);
        }

        
        if ($publication && $publication->user_id !== $user->id) {
            abort(403, 'No tienes permiso para editar esta publicación.');
        }

        return $next($request);
    }
}
