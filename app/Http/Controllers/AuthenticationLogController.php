<?php

namespace App\Http\Controllers;

use App\Models\AuthenticationLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthenticationLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = AuthenticationLog::query();

        // Apply filters
        if ($request->has('username')) {
            $query->where('username', 'like', '%' . $request->username . '%');
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('auth_type')) {
            $query->where('auth_type', $request->auth_type);
        }

        if ($request->has('date_from')) {
            $query->where('auth_time', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->where('auth_time', '<=', $request->date_to);
        }

        return Inertia::render('AuthenticationLogs/Index', [
            'auth' => [
                'user' => auth()->user()
            ],
            'logs' => $query->latest('auth_time')->paginate(20),
            'filters' => $request->only(['username', 'status', 'auth_type', 'date_from', 'date_to'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AuthenticationLog $authenticationLog)
    {
        return Inertia::render('AuthenticationLogs/Show', [
            'auth' => [
                'user' => auth()->user()
            ],
            'log' => $authenticationLog
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function export(Request $request)
    {
        $query = AuthenticationLog::query();

        // Apply the same filters as index
        if ($request->has('username')) {
            $query->where('username', 'like', '%' . $request->username . '%');
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('auth_type')) {
            $query->where('auth_type', $request->auth_type);
        }

        if ($request->has('date_from')) {
            $query->where('auth_time', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->where('auth_time', '<=', $request->date_to);
        }

        $logs = $query->latest('auth_time')->get();

        return response()->streamDownload(function () use ($logs) {
            $file = fopen('php://output', 'w');
            
            // Add headers
            fputcsv($file, [
                'Username',
                'Client IP',
                'NAS IP',
                'NAS Identifier',
                'Auth Type',
                'Status',
                'Reply Message',
                'Auth Time'
            ]);

            // Add data
            foreach ($logs as $log) {
                fputcsv($file, [
                    $log->username,
                    $log->client_ip,
                    $log->nas_ip,
                    $log->nas_identifier,
                    $log->auth_type,
                    $log->status,
                    $log->reply_message,
                    $log->auth_time
                ]);
            }

            fclose($file);
        }, 'authentication_logs.csv');
    }
}
