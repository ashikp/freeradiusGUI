<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        if (!Auth::check() || !$this->isRootUser(Auth::user())) {
            Auth::logout();
            return redirect()->route('login')->with('error', 'Access denied. Root privileges required.');
        }

        return $next($request);
    }

    /**
     * Check if the user has root privileges.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    protected function isRootUser($user): bool
    {
        // Check if the user's email matches the root pattern
        return $user->email === 'admin@example.com' || 
               $user->email === 'root@example.com' ||
               str_ends_with($user->email, '@root.local');
    }
} 