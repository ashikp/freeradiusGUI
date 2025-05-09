<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RadiusClient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'ip_address',
        'secret',
        'shortname',
        'nas_type',
        'description',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public static function rules($id = null)
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:radius_clients,name,' . $id],
            'ip_address' => ['required', 'ip', 'unique:radius_clients,ip_address,' . $id],
            'secret' => ['required', 'string', 'min:6', 'max:255'],
            'shortname' => ['nullable', 'string', 'max:255'],
            'nas_type' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_active' => ['boolean'],
        ];
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeInactive($query)
    {
        return $query->where('is_active', false);
    }

    public function getFullNameAttribute()
    {
        return $this->name . ' (' . $this->ip_address . ')';
    }
}
