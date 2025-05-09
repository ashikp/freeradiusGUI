<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRootAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is authenticated and is root
        if (!auth()->check() || !$this->isRootUser(auth()->user())) {
            auth()->logout();
            return redirect()->route('login')->with('error', 'Only root access is allowed.');
        }

        return $next($request);
    }

    /**
     * Check if the user is a root user
     */
    protected function isRootUser($user): bool
    {
        // Check if the user's email matches the root email pattern
        return $user->email === 'admin@example.com' || 
               $user->email === 'root@localhost' ||
               $user->email === 'root@' . gethostname();
    }
} 