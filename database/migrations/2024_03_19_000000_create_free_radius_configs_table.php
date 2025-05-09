<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('free_radius_configs', function (Blueprint $table) {
            $table->id();
            
            // General Settings
            $table->string('config_path')->default('/etc/freeradius/3.0');
            $table->string('log_path')->default('/var/log/freeradius');
            $table->string('lib_path')->default('/usr/lib/freeradius');
            $table->integer('max_requests')->default(16384);
            $table->integer('hostname_lookups')->default(0);
            $table->boolean('allow_core_dumps')->default(false);
            
            // Security Settings
            $table->string('security')->default('medium'); // low, medium, high
            $table->boolean('checkrad')->default(false);
            $table->integer('max_attributes')->default(200);
            $table->boolean('reject_delay')->default(true);
            $table->integer('status_server')->default(1);
            
            // Authentication Settings
            $table->string('auth_type')->default('pap'); // pap, chap, mschap, eap
            $table->boolean('auth_ok')->default(true);
            $table->boolean('auth_fail')->default(true);
            $table->boolean('auth_badpass')->default(true);
            $table->boolean('auth_goodpass')->default(true);
            
            // Accounting Settings
            $table->boolean('accounting_start')->default(true);
            $table->boolean('accounting_stop')->default(true);
            $table->boolean('accounting_update')->default(true);
            $table->boolean('accounting_all')->default(true);
            $table->string('accounting_store')->default('detail'); // detail, sql, file
            
            // Session Settings
            $table->boolean('session_start')->default(true);
            $table->boolean('session_stop')->default(true);
            $table->boolean('session_update')->default(true);
            $table->boolean('session_all')->default(true);
            
            // Proxy Settings
            $table->boolean('proxy_requests')->default(false);
            $table->string('proxy_realm')->nullable();
            $table->boolean('strip_realm')->default(false);
            
            // EAP Settings
            $table->json('eap_methods')->nullable(); // Array of enabled EAP methods
            $table->string('default_eap_type')->default('md5');
            $table->boolean('eap_peap')->default(true);
            $table->boolean('eap_ttls')->default(true);
            $table->boolean('eap_tls')->default(true);
            
            // TLS Settings
            $table->string('tls_cert_path')->nullable();
            $table->string('tls_key_path')->nullable();
            $table->string('tls_ca_path')->nullable();
            $table->string('tls_cipher_list')->default('HIGH:!aNULL:!MD5');
            $table->boolean('tls_verify_client')->default(false);
            
            // SQL Settings
            $table->string('sql_driver')->default('sqlite');
            $table->string('sql_server')->nullable();
            $table->integer('sql_port')->nullable();
            $table->string('sql_database')->nullable();
            $table->string('sql_username')->nullable();
            $table->string('sql_password')->nullable();
            $table->boolean('sql_read_groups')->default(true);
            $table->boolean('sql_delete_stale_sessions')->default(true);
            
            // LDAP Settings
            $table->boolean('ldap_enabled')->default(false);
            $table->string('ldap_server')->nullable();
            $table->integer('ldap_port')->default(389);
            $table->string('ldap_base_dn')->nullable();
            $table->string('ldap_bind_dn')->nullable();
            $table->string('ldap_bind_pw')->nullable();
            $table->string('ldap_filter')->nullable();
            
            // Dynamic Client Settings
            $table->boolean('dynamic_clients')->default(false);
            $table->string('dynamic_clients_dir')->nullable();
            
            // Module Settings
            $table->json('enabled_modules')->nullable(); // Array of enabled modules
            $table->json('module_configs')->nullable(); // JSON object for module-specific configs
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('free_radius_configs');
    }
}; 