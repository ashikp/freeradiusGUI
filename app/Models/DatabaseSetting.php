<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DatabaseSetting extends Model
{
    protected $fillable = [
        'driver',
        'host',
        'port',
        'database',
        'username',
        'password',
        'charset',
        'collation',
        'prefix',
        'is_active',
    ];

    protected $casts = [
        'port' => 'integer',
        'is_active' => 'boolean',
    ];

    public static function getValidationRules()
    {
        return [
            'driver' => 'required|in:sqlite,mysql,pgsql,oracle',
            'host' => 'required_unless:driver,sqlite|nullable|string|max:255',
            'port' => 'required_unless:driver,sqlite|nullable|integer|min:1|max:65535',
            'database' => 'required_unless:driver,sqlite|nullable|string|max:255',
            'username' => 'required_unless:driver,sqlite|nullable|string|max:255',
            'password' => 'required_unless:driver,sqlite|nullable|string|max:255',
            'charset' => 'required|string|max:255',
            'collation' => 'required|string|max:255',
            'prefix' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ];
    }
}
