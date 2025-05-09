<?php

namespace App\Http\Controllers;

use App\Models\FreeRadiusConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class FreeRadiusConfigController extends Controller
{
    public function index()
    {
        $config = FreeRadiusConfig::first();
        
        if (!$config) {
            $config = FreeRadiusConfig::create([
                'config_path' => '/etc/freeradius/3.0',
                'log_path' => '/var/log/freeradius',
                'lib_path' => '/usr/lib/freeradius',
                'max_requests' => 16384,
                'hostname_lookups' => 0,
                'allow_core_dumps' => false,
                'security' => 'medium',
                'checkrad' => false,
                'max_attributes' => 200,
                'reject_delay' => true,
                'status_server' => 1,
                'auth_type' => 'pap',
                'auth_ok' => true,
                'auth_fail' => true,
                'auth_badpass' => true,
                'auth_goodpass' => true,
                'accounting_start' => true,
                'accounting_stop' => true,
                'accounting_update' => true,
                'accounting_all' => true,
                'accounting_store' => 'detail',
                'session_start' => true,
                'session_stop' => true,
                'session_update' => true,
                'session_all' => true,
                'proxy_requests' => false,
                'strip_realm' => false,
                'default_eap_type' => 'md5',
                'eap_peap' => true,
                'eap_ttls' => true,
                'eap_tls' => true,
                'tls_cipher_list' => 'HIGH:!aNULL:!MD5',
                'tls_verify_client' => false,
                'sql_driver' => 'sqlite',
                'sql_read_groups' => true,
                'sql_delete_stale_sessions' => true,
                'ldap_enabled' => false,
                'ldap_port' => 389,
                'dynamic_clients' => false,
            ]);
        }

        return Inertia::render('FreeRadiusConfig/Index', [
            'config' => $config
        ]);
    }

    public function update(Request $request)
    {
        $config = FreeRadiusConfig::first();
        
        if (!$config) {
            return redirect()->back()->with('error', 'Configuration not found.');
        }

        $validator = Validator::make($request->all(), FreeRadiusConfig::rules());

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $config->update($request->all());

        // Update FreeRADIUS configuration files
        $this->updateFreeRadiusConfig($config);

        return redirect()->back()->with('success', 'FreeRADIUS configuration updated successfully.');
    }

    protected function updateFreeRadiusConfig(FreeRadiusConfig $config)
    {
        // Update radiusd.conf
        $this->updateRadiusdConf($config);
        
        // Update clients.conf
        $this->updateClientsConf($config);
        
        // Update sql.conf if SQL is enabled
        if ($config->sql_driver !== 'sqlite') {
            $this->updateSqlConf($config);
        }
        
        // Update ldap.conf if LDAP is enabled
        if ($config->ldap_enabled) {
            $this->updateLdapConf($config);
        }
        
        // Update eap.conf if EAP is enabled
        if ($config->auth_type === 'eap') {
            $this->updateEapConf($config);
        }
    }

    protected function updateRadiusdConf(FreeRadiusConfig $config)
    {
        $content = <<<EOT
prefix = {$config->config_path}
exec_prefix = {$config->config_path}
sysconfdir = {$config->config_path}
localstatedir = /var
sbindir = \${exec_prefix}/sbin
logdir = {$config->log_path}
raddbdir = \${sysconfdir}
radacctdir = \${logdir}/radacct

libdir = {$config->lib_path}

hostname_lookups = {$config->hostname_lookups}
allow_core_dumps = {$config->allow_core_dumps}

max_requests = {$config->max_requests}
max_attributes = {$config->max_attributes}

security {
    max_attributes = {$config->max_attributes}
    reject_delay = {$config->reject_delay}
    status_server = {$config->status_server}
}

log {
    destination = files
    file = \${logdir}/radius.log
    syslog_facility = daemon
    stripped_names = no
    auth = {$config->auth_ok}
    auth_badpass = {$config->auth_badpass}
    auth_goodpass = {$config->auth_goodpass}
}

checkrad = {$config->checkrad}

security {
    max_attributes = {$config->max_attributes}
    reject_delay = {$config->reject_delay}
    status_server = {$config->status_server}
}

proxy_requests = {$config->proxy_requests}
strip_realm = {$config->strip_realm}
EOT;

        file_put_contents($config->config_path . '/radiusd.conf', $content);
    }

    protected function updateClientsConf(FreeRadiusConfig $config)
    {
        $content = "client localhost {\n";
        $content .= "    ipaddr = 127.0.0.1\n";
        $content .= "    secret = testing123\n";
        $content .= "    require_message_authenticator = no\n";
        $content .= "    nastype = other\n";
        $content .= "}\n";

        if ($config->dynamic_clients) {
            $content .= "\ninclude {$config->dynamic_clients_dir}/*.conf\n";
        }

        file_put_contents($config->config_path . '/clients.conf', $content);
    }

    protected function updateSqlConf(FreeRadiusConfig $config)
    {
        $content = <<<EOT
sql {
    driver = "{$config->sql_driver}"
    server = "{$config->sql_server}"
    port = {$config->sql_port}
    login = "{$config->sql_username}"
    password = "{$config->sql_password}"
    radius_db = "{$config->sql_database}"
    read_groups = {$config->sql_read_groups}
    delete_stale_sessions = {$config->sql_delete_stale_sessions}
    
    # Remove stale session if checkrad does not see a double login
    delete_stale_sessions = yes
    
    # Print all SQL statements when in debug mode (-x)
    sqltrace = no
    sqltracefile = \${logdir}/sqltrace.sql
    
    # number of sql connections to make to server
    num_sql_socks = 5
    
    # lifetime of an "sql socket" to the sql server.  If you're having
    # issues with sql sockets being stale, set this to something
    # lower. 0 means "lifetime"
    socket_timeout = 0
    
    # Remove stale session if checkrad does not see a double login
    delete_stale_sessions = yes
    
    pool {
        start = \${thread[pool].start_servers}
        min = \${thread[pool].min_spare_servers}
        max = \${thread[pool].max_servers}
        spare = \${thread[pool].max_spare_servers}
        uses = 0
        retry_delay = 30
        lifetime = 0
        idle_timeout = 60
    }
    
    # Set to 'yes' to read radius clients from the database
    # 'nas' table
    read_clients = yes
    
    # Table to keep radius client info
    client_table = "nas"
    
    # The attribute to use to query the client table
    group_attribute = "Group"
    
    # The query to load the DICTIONARY
    dictionary_table = "raddictionary"
    
    # Remove stale session if checkrad does not see a double login
    delete_stale_sessions = yes
    
    # Print all SQL statements when in debug mode (-x)
    sqltrace = no
    sqltracefile = \${logdir}/sqltrace.sql
    
    # number of sql connections to make to server
    num_sql_socks = 5
    
    # lifetime of an "sql socket" to the sql server.  If you're having
    # issues with sql sockets being stale, set this to something
    # lower. 0 means "lifetime"
    socket_timeout = 0
    
    # Remove stale session if checkrad does not see a double login
    delete_stale_sessions = yes
    
    pool {
        start = \${thread[pool].start_servers}
        min = \${thread[pool].min_spare_servers}
        max = \${thread[pool].max_servers}
        spare = \${thread[pool].max_spare_servers}
        uses = 0
        retry_delay = 30
        lifetime = 0
        idle_timeout = 60
    }
}
EOT;

        file_put_contents($config->config_path . '/mods-available/sql', $content);
    }

    protected function updateLdapConf(FreeRadiusConfig $config)
    {
        $content = <<<EOT
ldap {
    server = "{$config->ldap_server}"
    port = {$config->ldap_port}
    identity = "{$config->ldap_bind_dn}"
    password = "{$config->ldap_bind_pw}"
    base_dn = "{$config->ldap_base_dn}"
    
    # Filter to use when searching for the user's entry
    filter = "{$config->ldap_filter}"
    
    # Search scope
    scope = "sub"
    
    # User object class
    user {
        base_dn = "{$config->ldap_base_dn}"
        filter = "(&(objectClass=person)(uid=%{Stripped-User-Name}))"
    }
    
    # Group object class
    group {
        base_dn = "{$config->ldap_base_dn}"
        filter = "(objectClass=groupOfNames)"
        membership_attribute = "member"
    }
    
    # Profile object class
    profile {
        base_dn = "{$config->ldap_base_dn}"
        filter = "(objectClass=radiusProfile)"
    }
    
    # Client object class
    client {
        base_dn = "{$config->ldap_base_dn}"
        filter = "(objectClass=radiusClient)"
    }
    
    # Accounting object class
    accounting {
        reference = "%{tolower:type.%{Acct-Status-Type}.query}"
        
        type {
            start {
                update {
                    description := "Starting SQL accounting record"
                    reference := "start"
                }
            }
            stop {
                update {
                    description := "Stopping SQL accounting record"
                    reference := "stop"
                }
            }
            update {
                update {
                    description := "Updating SQL accounting record"
                    reference := "update"
                }
            }
            accounting-on {
                update {
                    description := "Starting SQL accounting record"
                    reference := "start"
                }
            }
            accounting-off {
                update {
                    description := "Stopping SQL accounting record"
                    reference := "stop"
                }
            }
        }
    }
    
    # Post-auth object class
    post-auth {
        update {
            description := "Executing SQL post-auth query"
            reference := "post-auth"
        }
    }
}
EOT;

        file_put_contents($config->config_path . '/mods-available/ldap', $content);
    }

    protected function updateEapConf(FreeRadiusConfig $config)
    {
        $content = <<<EOT
eap {
    default_eap_type = {$config->default_eap_type}
    
    # EAP types to include
    types = {
EOT;

        if ($config->eap_peap) {
            $content .= <<<EOT
        peap {
            default_eap_type = mschapv2
            copy_request_to_tunnel = yes
            use_tunneled_reply = yes
            virtual_server = "inner-tunnel"
        }
EOT;
        }

        if ($config->eap_ttls) {
            $content .= <<<EOT
        ttls {
            default_eap_type = mschapv2
            copy_request_to_tunnel = yes
            use_tunneled_reply = yes
            virtual_server = "inner-tunnel"
        }
EOT;
        }

        if ($config->eap_tls) {
            $content .= <<<EOT
        tls {
            private_key_password = "whatever"
            private_key_file = "{$config->tls_key_path}"
            certificate_file = "{$config->tls_cert_path}"
            ca_file = "{$config->tls_ca_path}"
            dh_file = "\${certdir}/dh"
            random_file = "\${certdir}/random"
            fragment_size = 1024
            include_length = yes
            check_crl = no
            cipher_list = "{$config->tls_cipher_list}"
            verify {
                tmpdir = /tmp
                client = {$config->tls_verify_client}
            }
        }
EOT;
        }

        $content .= <<<EOT
    }
}
EOT;

        file_put_contents($config->config_path . '/mods-available/eap', $content);
    }
} 