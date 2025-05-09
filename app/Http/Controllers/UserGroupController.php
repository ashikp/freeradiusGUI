<?php

namespace App\Http\Controllers;

use App\Models\UserGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('UserGroups/Index', [
            'auth' => [
                'user' => auth()->user()
            ],
            'groups' => UserGroup::latest()->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('UserGroups/Create', [
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
            'name' => 'required|string|max:255|unique:user_groups',
            'groupname' => 'required|string|max:255|unique:user_groups',
            'description' => 'nullable|string',
            'attributes' => 'nullable|array',
            'is_active' => 'boolean'
        ]);

        UserGroup::create($validated);

        return redirect()->route('user-groups.index')
            ->with('success', 'User group created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(UserGroup $userGroup)
    {
        return Inertia::render('UserGroups/Show', [
            'auth' => [
                'user' => auth()->user()
            ],
            'group' => $userGroup
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserGroup $userGroup)
    {
        return Inertia::render('UserGroups/Edit', [
            'auth' => [
                'user' => auth()->user()
            ],
            'group' => $userGroup
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserGroup $userGroup)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:user_groups,name,' . $userGroup->id,
            'groupname' => 'required|string|max:255|unique:user_groups,groupname,' . $userGroup->id,
            'description' => 'nullable|string',
            'attributes' => 'nullable|array',
            'is_active' => 'boolean'
        ]);

        $userGroup->update($validated);

        return redirect()->route('user-groups.index')
            ->with('success', 'User group updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserGroup $userGroup)
    {
        $userGroup->delete();

        return redirect()->route('user-groups.index')
            ->with('success', 'User group deleted successfully.');
    }
}
