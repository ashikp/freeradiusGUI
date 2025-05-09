<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FreeRadiusConfig extends Model
{
    use HasFactory;

    protected $fillable = [
        // General Settings
        'config_path',
        'log_path',
        'lib_path',
        'max_requests',
        'hostname_lookups',
        'allow_core_dumps',
        
        // Security Settings
        'security',
        'checkrad',
        'max_attributes',
        'reject_delay',
        'status_server',
        
        // Authentication Settings
        'auth_type',
        'auth_ok',
        'auth_fail',
        'auth_badpass',
        'auth_goodpass',
        
        // Accounting Settings
        'accounting_start',
        'accounting_stop',
        'accounting_update',
        'accounting_all',
        'accounting_store',
        
        // Session Settings
        'session_start',
        'session_stop',
        'session_update',
        'session_all',
        
        // Proxy Settings
        'proxy_requests',
        'proxy_realm',
        'strip_realm',
        
        // EAP Settings
        'eap_methods',
        'default_eap_type',
        'eap_peap',
        'eap_ttls',
        'eap_tls',
        
        // TLS Settings
        'tls_cert_path',
        'tls_key_path',
        'tls_ca_path',
        'tls_cipher_list',
        'tls_verify_client',
        
        // SQL Settings
        'sql_driver',
        'sql_server',
        'sql_port',
        'sql_database',
        'sql_username',
        'sql_password',
        'sql_read_groups',
        'sql_delete_stale_sessions',
        
        // LDAP Settings
        'ldap_enabled',
        'ldap_server',
        'ldap_port',
        'ldap_base_dn',
        'ldap_bind_dn',
        'ldap_bind_pw',
        'ldap_filter',
        
        // Dynamic Client Settings
        'dynamic_clients',
        'dynamic_clients_dir',
        
        // Module Settings
        'enabled_modules',
        'module_configs',
    ];

    protected $casts = [
        'eap_methods' => 'array',
        'enabled_modules' => 'array',
        'module_configs' => 'array',
        'allow_core_dumps' => 'boolean',
        'checkrad' => 'boolean',
        'reject_delay' => 'boolean',
        'auth_ok' => 'boolean',
        'auth_fail' => 'boolean',
        'auth_badpass' => 'boolean',
        'auth_goodpass' => 'boolean',
        'accounting_start' => 'boolean',
        'accounting_stop' => 'boolean',
        'accounting_update' => 'boolean',
        'accounting_all' => 'boolean',
        'session_start' => 'boolean',
        'session_stop' => 'boolean',
        'session_update' => 'boolean',
        'session_all' => 'boolean',
        'proxy_requests' => 'boolean',
        'strip_realm' => 'boolean',
        'eap_peap' => 'boolean',
        'eap_ttls' => 'boolean',
        'eap_tls' => 'boolean',
        'tls_verify_client' => 'boolean',
        'sql_read_groups' => 'boolean',
        'sql_delete_stale_sessions' => 'boolean',
        'ldap_enabled' => 'boolean',
        'dynamic_clients' => 'boolean',
    ];

    public static function rules()
    {
        return [
            // General Settings
            'config_path' => 'required|string',
            'log_path' => 'required|string',
            'lib_path' => 'required|string',
            'max_requests' => 'required|integer|min:1',
            'hostname_lookups' => 'required|integer|in:0,1,2',
            'allow_core_dumps' => 'required|boolean',
            
            // Security Settings
            'security' => 'required|string|in:low,medium,high',
            'checkrad' => 'required|boolean',
            'max_attributes' => 'required|integer|min:1',
            'reject_delay' => 'required|boolean',
            'status_server' => 'required|integer|in:0,1',
            
            // Authentication Settings
            'auth_type' => 'required|string|in:pap,chap,mschap,eap',
            'auth_ok' => 'required|boolean',
            'auth_fail' => 'required|boolean',
            'auth_badpass' => 'required|boolean',
            'auth_goodpass' => 'required|boolean',
            
            // Accounting Settings
            'accounting_start' => 'required|boolean',
            'accounting_stop' => 'required|boolean',
            'accounting_update' => 'required|boolean',
            'accounting_all' => 'required|boolean',
            'accounting_store' => 'required|string|in:detail,sql,file',
            
            // Session Settings
            'session_start' => 'required|boolean',
            'session_stop' => 'required|boolean',
            'session_update' => 'required|boolean',
            'session_all' => 'required|boolean',
            
            // Proxy Settings
            'proxy_requests' => 'required|boolean',
            'proxy_realm' => 'nullable|string',
            'strip_realm' => 'required|boolean',
            
            // EAP Settings
            'eap_methods' => 'nullable|array',
            'default_eap_type' => 'required|string|in:md5,peap,ttls,tls',
            'eap_peap' => 'required|boolean',
            'eap_ttls' => 'required|boolean',
            'eap_tls' => 'required|boolean',
            
            // TLS Settings
            'tls_cert_path' => 'nullable|string',
            'tls_key_path' => 'nullable|string',
            'tls_ca_path' => 'nullable|string',
            'tls_cipher_list' => 'required|string',
            'tls_verify_client' => 'required|boolean',
            
            // SQL Settings
            'sql_driver' => 'required|string|in:sqlite,mysql,pgsql',
            'sql_server' => 'nullable|string',
            'sql_port' => 'nullable|integer|min:1|max:65535',
            'sql_database' => 'nullable|string',
            'sql_username' => 'nullable|string',
            'sql_password' => 'nullable|string',
            'sql_read_groups' => 'required|boolean',
            'sql_delete_stale_sessions' => 'required|boolean',
            
            // LDAP Settings
            'ldap_enabled' => 'required|boolean',
            'ldap_server' => 'required_if:ldap_enabled,true|string',
            'ldap_port' => 'required_if:ldap_enabled,true|integer|min:1|max:65535',
            'ldap_base_dn' => 'required_if:ldap_enabled,true|string',
            'ldap_bind_dn' => 'required_if:ldap_enabled,true|string',
            'ldap_bind_pw' => 'required_if:ldap_enabled,true|string',
            'ldap_filter' => 'nullable|string',
            
            // Dynamic Client Settings
            'dynamic_clients' => 'required|boolean',
            'dynamic_clients_dir' => 'required_if:dynamic_clients,true|string',
            
            // Module Settings
            'enabled_modules' => 'nullable|array',
            'module_configs' => 'nullable|array',
        ];
    }
}
