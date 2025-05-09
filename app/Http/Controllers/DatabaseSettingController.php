<?php

namespace App\Http\Controllers;

use App\Models\DatabaseSetting;
use App\Services\FreeRadiusService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DatabaseSettingController extends Controller
{
    protected $freeRadiusService;

    public function __construct(FreeRadiusService $freeRadiusService)
    {
        $this->freeRadiusService = $freeRadiusService;
    }

    public function index()
    {
        return Inertia::render('DatabaseSettings/Index', [
            'auth' => [
                'user' => auth()->user()
            ],
            'settings' => DatabaseSetting::latest()->get(),
            'currentSetting' => DatabaseSetting::where('is_active', true)->first()
        ]);
    }

    public function create()
    {
        return Inertia::render('DatabaseSettings/Create', [
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(DatabaseSetting::getValidationRules());

        // If this is the first setting or marked as active, deactivate all others
        if ($validated['is_active']) {
            DatabaseSetting::where('is_active', true)->update(['is_active' => false]);
        }

        $setting = DatabaseSetting::create($validated);

        // Update FreeRADIUS configuration
        $this->freeRadiusService->updateDatabaseConfig($setting);

        return redirect()->route('database-settings.index')
            ->with('success', 'Database settings created successfully.');
    }

    public function edit(DatabaseSetting $databaseSetting)
    {
        return Inertia::render('DatabaseSettings/Edit', [
            'auth' => [
                'user' => auth()->user()
            ],
            'setting' => $databaseSetting
        ]);
    }

    public function update(Request $request, DatabaseSetting $databaseSetting)
    {
        $validated = $request->validate(DatabaseSetting::getValidationRules());

        // If this setting is being activated, deactivate all others
        if ($validated['is_active']) {
            DatabaseSetting::where('is_active', true)
                ->where('id', '!=', $databaseSetting->id)
                ->update(['is_active' => false]);
        }

        $databaseSetting->update($validated);

        // Update FreeRADIUS configuration
        $this->freeRadiusService->updateDatabaseConfig($databaseSetting);

        return redirect()->route('database-settings.index')
            ->with('success', 'Database settings updated successfully.');
    }

    public function destroy(DatabaseSetting $databaseSetting)
    {
        if ($databaseSetting->is_active) {
            return redirect()->route('database-settings.index')
                ->with('error', 'Cannot delete active database setting.');
        }

        $databaseSetting->delete();

        return redirect()->route('database-settings.index')
            ->with('success', 'Database settings deleted successfully.');
    }

    public function activate(DatabaseSetting $databaseSetting)
    {
        // Deactivate all other settings
        DatabaseSetting::where('is_active', true)
            ->where('id', '!=', $databaseSetting->id)
            ->update(['is_active' => false]);

        // Activate the selected setting
        $databaseSetting->update(['is_active' => true]);

        // Update FreeRADIUS configuration
        $this->freeRadiusService->updateDatabaseConfig($databaseSetting);

        return redirect()->route('database-settings.index')
            ->with('success', 'Database settings activated successfully.');
    }
}
