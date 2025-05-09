<?php

return [
    /*
    |--------------------------------------------------------------------------
    | FreeRADIUS Configuration Path
    |--------------------------------------------------------------------------
    |
    | This is the path to your FreeRADIUS configuration directory.
    | Default is /etc/freeradius/3.0
    |
    */
    'config_path' => env('FREERADIUS_CONFIG_PATH', '/etc/freeradius/3.0'),

    /*
    |--------------------------------------------------------------------------
    | FreeRADIUS Log Path
    |--------------------------------------------------------------------------
    |
    | This is the path to your FreeRADIUS log directory.
    | Default is /var/log/freeradius
    |
    */
    'log_path' => env('FREERADIUS_LOG_PATH', '/var/log/freeradius'),

    /*
    |--------------------------------------------------------------------------
    | Default Authentication Methods
    |--------------------------------------------------------------------------
    |
    | These are the default authentication methods that will be available
    | in the system.
    |
    */
    'default_auth_methods' => [
        [
            'name' => 'PAP',
            'type' => 'pap',
            'module' => 'files',
            'is_active' => true,
            'priority' => 1,
        ],
        [
            'name' => 'CHAP',
            'type' => 'chap',
            'module' => 'files',
            'is_active' => true,
            'priority' => 2,
        ],
        [
            'name' => 'MS-CHAP',
            'type' => 'mschap',
            'module' => 'files',
            'is_active' => true,
            'priority' => 3,
        ],
        [
            'name' => 'EAP-TTLS',
            'type' => 'eap',
            'module' => 'eap',
            'is_active' => true,
            'priority' => 4,
        ],
    ],
]; 