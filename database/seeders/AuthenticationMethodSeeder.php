<?php

namespace Database\Seeders;

use App\Models\AuthenticationMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuthenticationMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $methods = config('freeradius.default_auth_methods', []);

        foreach ($methods as $method) {
            AuthenticationMethod::updateOrCreate(
                ['name' => $method['name']],
                $method
            );
        }
    }
}
