<?php

namespace App\Http\Controllers;

use App\Models\AuthenticationMethod;
use App\Services\FreeRadiusService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthenticationMethodController extends Controller
{
    protected $freeRadiusService;

    public function __construct(FreeRadiusService $freeRadiusService)
    {
        $this->freeRadiusService = $freeRadiusService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('AuthenticationMethods/Index', [
            'auth' => [
                'user' => auth()->user()
            ],
            'methods' => AuthenticationMethod::orderBy('priority')->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('AuthenticationMethods/Create', [
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:authentication_methods',
            'type' => 'required|string|max:255',
            'module' => 'required|string|max:255',
            'config' => 'nullable|array',
            'is_active' => 'boolean',
            'priority' => 'required|integer|min:0'
        ]);

        AuthenticationMethod::create($validated);

        // Test FreeRADIUS configuration after adding new method
        $this->freeRadiusService->testConfig();

        return redirect()->route('authentication-methods.index')
            ->with('success', 'Authentication method created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(AuthenticationMethod $authenticationMethod)
    {
        return Inertia::render('AuthenticationMethods/Show', [
            'auth' => [
                'user' => auth()->user()
            ],
            'method' => $authenticationMethod
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AuthenticationMethod $authenticationMethod)
    {
        return Inertia::render('AuthenticationMethods/Edit', [
            'auth' => [
                'user' => auth()->user()
            ],
            'method' => $authenticationMethod
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AuthenticationMethod $authenticationMethod)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:authentication_methods,name,' . $authenticationMethod->id,
            'type' => 'required|string|max:255',
            'module' => 'required|string|max:255',
            'config' => 'nullable|array',
            'is_active' => 'boolean',
            'priority' => 'required|integer|min:0'
        ]);

        $authenticationMethod->update($validated);

        // Test FreeRADIUS configuration after updating method
        $this->freeRadiusService->testConfig();

        return redirect()->route('authentication-methods.index')
            ->with('success', 'Authentication method updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AuthenticationMethod $authenticationMethod)
    {
        $authenticationMethod->delete();

        // Test FreeRADIUS configuration after removing method
        $this->freeRadiusService->testConfig();

        return redirect()->route('authentication-methods.index')
            ->with('success', 'Authentication method deleted successfully.');
    }

    public function updatePriority(Request $request)
    {
        $validated = $request->validate([
            'methods' => 'required|array',
            'methods.*.id' => 'required|exists:authentication_methods,id',
            'methods.*.priority' => 'required|integer|min:0'
        ]);

        foreach ($validated['methods'] as $method) {
            AuthenticationMethod::where('id', $method['id'])
                ->update(['priority' => $method['priority']]);
        }

        // Test FreeRADIUS configuration after updating priorities
        $this->freeRadiusService->testConfig();

        return response()->json(['message' => 'Priorities updated successfully']);
    }
}
