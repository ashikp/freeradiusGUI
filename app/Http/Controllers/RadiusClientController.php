<?php

namespace App\Http\Controllers;

use App\Models\RadiusClient;
use App\Services\FreeRadiusService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RadiusClientController extends Controller
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
        return Inertia::render('RadiusClients/Index', [
            'auth' => [
                'user' => auth()->user()
            ],
            'clients' => RadiusClient::latest()->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('RadiusClients/Create', [
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
            'name' => 'required|string|max:255',
            'ip_address' => 'required|ip',
            'secret' => 'required|string|min:8',
            'shortname' => 'nullable|string|max:255',
            'nas_type' => 'nullable|string|max:255',
            'comment' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $client = RadiusClient::create($validated);

        // Update FreeRADIUS configuration
        $this->freeRadiusService->updateClientsConfig();

        return redirect()->route('radius-clients.index')
            ->with('success', 'RADIUS client created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(RadiusClient $radiusClient)
    {
        return Inertia::render('RadiusClients/Show', [
            'auth' => [
                'user' => auth()->user()
            ],
            'client' => $radiusClient
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RadiusClient $radiusClient)
    {
        return Inertia::render('RadiusClients/Edit', [
            'auth' => [
                'user' => auth()->user()
            ],
            'client' => $radiusClient
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RadiusClient $radiusClient)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'ip_address' => 'required|ip',
            'secret' => 'required|string|min:8',
            'shortname' => 'nullable|string|max:255',
            'nas_type' => 'nullable|string|max:255',
            'comment' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $radiusClient->update($validated);

        // Update FreeRADIUS configuration
        $this->freeRadiusService->updateClientsConfig();

        return redirect()->route('radius-clients.index')
            ->with('success', 'RADIUS client updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RadiusClient $radiusClient)
    {
        $radiusClient->delete();

        // Update FreeRADIUS configuration
        $this->freeRadiusService->updateClientsConfig();

        return redirect()->route('radius-clients.index')
            ->with('success', 'RADIUS client deleted successfully.');
    }
}
