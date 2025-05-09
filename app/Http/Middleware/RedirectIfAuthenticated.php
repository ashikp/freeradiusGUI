<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                // Check if the route requires root access
                if ($request->route()->middleware() && in_array('root', $request->route()->middleware())) {
                    // If user is not root, log them out and redirect to login
                    if (!Auth::user()->email === 'admin@example.com' && 
                        !Auth::user()->email === 'root@example.com' && 
                        !str_ends_with(Auth::user()->email, '@root.local')) {
                        Auth::logout();
                        return redirect()->route('login')->with('error', 'Access denied. Root privileges required.');
                    }
                }
                return redirect(RouteServiceProvider::HOME);
            }
        }

        return $next($request);
    }
} 