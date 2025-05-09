import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import SelectInput from '@/Components/SelectInput';

export default function Index({ auth, config }) {
    const { data, setData, put, processing, errors } = useForm({
        // General Settings
        config_path: config.config_path,
        log_path: config.log_path,
        lib_path: config.lib_path,
        max_requests: config.max_requests,
        hostname_lookups: config.hostname_lookups,
        allow_core_dumps: config.allow_core_dumps,
        
        // Security Settings
        security: config.security,
        checkrad: config.checkrad,
        max_attributes: config.max_attributes,
        reject_delay: config.reject_delay,
        status_server: config.status_server,
        
        // Authentication Settings
        auth_type: config.auth_type,
        auth_ok: config.auth_ok,
        auth_fail: config.auth_fail,
        auth_badpass: config.auth_badpass,
        auth_goodpass: config.auth_goodpass,
        
        // Accounting Settings
        accounting_start: config.accounting_start,
        accounting_stop: config.accounting_stop,
        accounting_update: config.accounting_update,
        accounting_all: config.accounting_all,
        accounting_store: config.accounting_store,
        
        // Session Settings
        session_start: config.session_start,
        session_stop: config.session_stop,
        session_update: config.session_update,
        session_all: config.session_all,
        
        // Proxy Settings
        proxy_requests: config.proxy_requests,
        proxy_realm: config.proxy_realm,
        strip_realm: config.strip_realm,
        
        // EAP Settings
        eap_methods: config.eap_methods,
        default_eap_type: config.default_eap_type,
        eap_peap: config.eap_peap,
        eap_ttls: config.eap_ttls,
        eap_tls: config.eap_tls,
        
        // TLS Settings
        tls_cert_path: config.tls_cert_path,
        tls_key_path: config.tls_key_path,
        tls_ca_path: config.tls_ca_path,
        tls_cipher_list: config.tls_cipher_list,
        tls_verify_client: config.tls_verify_client,
        
        // SQL Settings
        sql_driver: config.sql_driver,
        sql_server: config.sql_server,
        sql_port: config.sql_port,
        sql_database: config.sql_database,
        sql_username: config.sql_username,
        sql_password: config.sql_password,
        sql_read_groups: config.sql_read_groups,
        sql_delete_stale_sessions: config.sql_delete_stale_sessions,
        
        // LDAP Settings
        ldap_enabled: config.ldap_enabled,
        ldap_server: config.ldap_server,
        ldap_port: config.ldap_port,
        ldap_base_dn: config.ldap_base_dn,
        ldap_bind_dn: config.ldap_bind_dn,
        ldap_bind_pw: config.ldap_bind_pw,
        ldap_filter: config.ldap_filter,
        
        // Dynamic Client Settings
        dynamic_clients: config.dynamic_clients,
        dynamic_clients_dir: config.dynamic_clients_dir,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('free-radius-config.update'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">FreeRADIUS Configuration</h2>}
        >
            <Head title="FreeRADIUS Configuration" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                {/* General Settings */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="config_path" value="Config Path" />
                                            <TextInput
                                                id="config_path"
                                                type="text"
                                                name="config_path"
                                                value={data.config_path}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('config_path', e.target.value)}
                                            />
                                            <InputError message={errors.config_path} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="log_path" value="Log Path" />
                                            <TextInput
                                                id="log_path"
                                                type="text"
                                                name="log_path"
                                                value={data.log_path}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('log_path', e.target.value)}
                                            />
                                            <InputError message={errors.log_path} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="lib_path" value="Library Path" />
                                            <TextInput
                                                id="lib_path"
                                                type="text"
                                                name="lib_path"
                                                value={data.lib_path}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('lib_path', e.target.value)}
                                            />
                                            <InputError message={errors.lib_path} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="max_requests" value="Max Requests" />
                                            <TextInput
                                                id="max_requests"
                                                type="number"
                                                name="max_requests"
                                                value={data.max_requests}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('max_requests', e.target.value)}
                                            />
                                            <InputError message={errors.max_requests} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="hostname_lookups" value="Hostname Lookups" />
                                            <SelectInput
                                                id="hostname_lookups"
                                                name="hostname_lookups"
                                                value={data.hostname_lookups}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('hostname_lookups', e.target.value)}
                                            >
                                                <option value="0">No</option>
                                                <option value="1">Yes</option>
                                                <option value="2">Reverse DNS</option>
                                            </SelectInput>
                                            <InputError message={errors.hostname_lookups} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="allow_core_dumps"
                                                name="allow_core_dumps"
                                                checked={data.allow_core_dumps}
                                                onChange={(e) => setData('allow_core_dumps', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="allow_core_dumps" value="Allow Core Dumps" className="ml-2" />
                                            <InputError message={errors.allow_core_dumps} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Security Settings */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="security" value="Security Level" />
                                            <SelectInput
                                                id="security"
                                                name="security"
                                                value={data.security}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('security', e.target.value)}
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </SelectInput>
                                            <InputError message={errors.security} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="max_attributes" value="Max Attributes" />
                                            <TextInput
                                                id="max_attributes"
                                                type="number"
                                                name="max_attributes"
                                                value={data.max_attributes}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('max_attributes', e.target.value)}
                                            />
                                            <InputError message={errors.max_attributes} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="checkrad"
                                                name="checkrad"
                                                checked={data.checkrad}
                                                onChange={(e) => setData('checkrad', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="checkrad" value="Check RAD" className="ml-2" />
                                            <InputError message={errors.checkrad} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="reject_delay"
                                                name="reject_delay"
                                                checked={data.reject_delay}
                                                onChange={(e) => setData('reject_delay', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="reject_delay" value="Reject Delay" className="ml-2" />
                                            <InputError message={errors.reject_delay} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="status_server" value="Status Server" />
                                            <SelectInput
                                                id="status_server"
                                                name="status_server"
                                                value={data.status_server}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('status_server', e.target.value)}
                                            >
                                                <option value="0">Disabled</option>
                                                <option value="1">Enabled</option>
                                            </SelectInput>
                                            <InputError message={errors.status_server} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Authentication Settings */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Authentication Settings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="auth_type" value="Authentication Type" />
                                            <SelectInput
                                                id="auth_type"
                                                name="auth_type"
                                                value={data.auth_type}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('auth_type', e.target.value)}
                                            >
                                                <option value="pap">PAP</option>
                                                <option value="chap">CHAP</option>
                                                <option value="mschap">MS-CHAP</option>
                                                <option value="eap">EAP</option>
                                            </SelectInput>
                                            <InputError message={errors.auth_type} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="auth_ok"
                                                name="auth_ok"
                                                checked={data.auth_ok}
                                                onChange={(e) => setData('auth_ok', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="auth_ok" value="Log Successful Auth" className="ml-2" />
                                            <InputError message={errors.auth_ok} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="auth_fail"
                                                name="auth_fail"
                                                checked={data.auth_fail}
                                                onChange={(e) => setData('auth_fail', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="auth_fail" value="Log Failed Auth" className="ml-2" />
                                            <InputError message={errors.auth_fail} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="auth_badpass"
                                                name="auth_badpass"
                                                checked={data.auth_badpass}
                                                onChange={(e) => setData('auth_badpass', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="auth_badpass" value="Log Bad Password" className="ml-2" />
                                            <InputError message={errors.auth_badpass} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="auth_goodpass"
                                                name="auth_goodpass"
                                                checked={data.auth_goodpass}
                                                onChange={(e) => setData('auth_goodpass', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="auth_goodpass" value="Log Good Password" className="ml-2" />
                                            <InputError message={errors.auth_goodpass} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Accounting Settings */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Accounting Settings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center">
                                            <Checkbox
                                                id="accounting_start"
                                                name="accounting_start"
                                                checked={data.accounting_start}
                                                onChange={(e) => setData('accounting_start', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="accounting_start" value="Log Start" className="ml-2" />
                                            <InputError message={errors.accounting_start} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="accounting_stop"
                                                name="accounting_stop"
                                                checked={data.accounting_stop}
                                                onChange={(e) => setData('accounting_stop', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="accounting_stop" value="Log Stop" className="ml-2" />
                                            <InputError message={errors.accounting_stop} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="accounting_update"
                                                name="accounting_update"
                                                checked={data.accounting_update}
                                                onChange={(e) => setData('accounting_update', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="accounting_update" value="Log Update" className="ml-2" />
                                            <InputError message={errors.accounting_update} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="accounting_all"
                                                name="accounting_all"
                                                checked={data.accounting_all}
                                                onChange={(e) => setData('accounting_all', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="accounting_all" value="Log All" className="ml-2" />
                                            <InputError message={errors.accounting_all} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="accounting_store" value="Accounting Store" />
                                            <SelectInput
                                                id="accounting_store"
                                                name="accounting_store"
                                                value={data.accounting_store}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('accounting_store', e.target.value)}
                                            >
                                                <option value="detail">Detail</option>
                                                <option value="sql">SQL</option>
                                                <option value="file">File</option>
                                            </SelectInput>
                                            <InputError message={errors.accounting_store} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Session Settings */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Session Settings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center">
                                            <Checkbox
                                                id="session_start"
                                                name="session_start"
                                                checked={data.session_start}
                                                onChange={(e) => setData('session_start', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="session_start" value="Log Start" className="ml-2" />
                                            <InputError message={errors.session_start} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="session_stop"
                                                name="session_stop"
                                                checked={data.session_stop}
                                                onChange={(e) => setData('session_stop', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="session_stop" value="Log Stop" className="ml-2" />
                                            <InputError message={errors.session_stop} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="session_update"
                                                name="session_update"
                                                checked={data.session_update}
                                                onChange={(e) => setData('session_update', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="session_update" value="Log Update" className="ml-2" />
                                            <InputError message={errors.session_update} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="session_all"
                                                name="session_all"
                                                checked={data.session_all}
                                                onChange={(e) => setData('session_all', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="session_all" value="Log All" className="ml-2" />
                                            <InputError message={errors.session_all} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Proxy Settings */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Proxy Settings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center">
                                            <Checkbox
                                                id="proxy_requests"
                                                name="proxy_requests"
                                                checked={data.proxy_requests}
                                                onChange={(e) => setData('proxy_requests', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="proxy_requests" value="Enable Proxy" className="ml-2" />
                                            <InputError message={errors.proxy_requests} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="proxy_realm" value="Proxy Realm" />
                                            <TextInput
                                                id="proxy_realm"
                                                type="text"
                                                name="proxy_realm"
                                                value={data.proxy_realm}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('proxy_realm', e.target.value)}
                                            />
                                            <InputError message={errors.proxy_realm} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="strip_realm"
                                                name="strip_realm"
                                                checked={data.strip_realm}
                                                onChange={(e) => setData('strip_realm', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="strip_realm" value="Strip Realm" className="ml-2" />
                                            <InputError message={errors.strip_realm} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* EAP Settings */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">EAP Settings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="default_eap_type" value="Default EAP Type" />
                                            <SelectInput
                                                id="default_eap_type"
                                                name="default_eap_type"
                                                value={data.default_eap_type}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('default_eap_type', e.target.value)}
                                            >
                                                <option value="md5">MD5</option>
                                                <option value="peap">PEAP</option>
                                                <option value="ttls">TTLS</option>
                                                <option value="tls">TLS</option>
                                            </SelectInput>
                                            <InputError message={errors.default_eap_type} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="eap_peap"
                                                name="eap_peap"
                                                checked={data.eap_peap}
                                                onChange={(e) => setData('eap_peap', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="eap_peap" value="Enable PEAP" className="ml-2" />
                                            <InputError message={errors.eap_peap} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="eap_ttls"
                                                name="eap_ttls"
                                                checked={data.eap_ttls}
                                                onChange={(e) => setData('eap_ttls', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="eap_ttls" value="Enable TTLS" className="ml-2" />
                                            <InputError message={errors.eap_ttls} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="eap_tls"
                                                name="eap_tls"
                                                checked={data.eap_tls}
                                                onChange={(e) => setData('eap_tls', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="eap_tls" value="Enable TLS" className="ml-2" />
                                            <InputError message={errors.eap_tls} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* TLS Settings */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">TLS Settings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="tls_cert_path" value="Certificate Path" />
                                            <TextInput
                                                id="tls_cert_path"
                                                type="text"
                                                name="tls_cert_path"
                                                value={data.tls_cert_path}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('tls_cert_path', e.target.value)}
                                            />
                                            <InputError message={errors.tls_cert_path} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="tls_key_path" value="Key Path" />
                                            <TextInput
                                                id="tls_key_path"
                                                type="text"
                                                name="tls_key_path"
                                                value={data.tls_key_path}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('tls_key_path', e.target.value)}
                                            />
                                            <InputError message={errors.tls_key_path} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="tls_ca_path" value="CA Path" />
                                            <TextInput
                                                id="tls_ca_path"
                                                type="text"
                                                name="tls_ca_path"
                                                value={data.tls_ca_path}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('tls_ca_path', e.target.value)}
                                            />
                                            <InputError message={errors.tls_ca_path} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="tls_cipher_list" value="Cipher List" />
                                            <TextInput
                                                id="tls_cipher_list"
                                                type="text"
                                                name="tls_cipher_list"
                                                value={data.tls_cipher_list}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('tls_cipher_list', e.target.value)}
                                            />
                                            <InputError message={errors.tls_cipher_list} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="tls_verify_client"
                                                name="tls_verify_client"
                                                checked={data.tls_verify_client}
                                                onChange={(e) => setData('tls_verify_client', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="tls_verify_client" value="Verify Client" className="ml-2" />
                                            <InputError message={errors.tls_verify_client} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* SQL Settings */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">SQL Settings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="sql_driver" value="SQL Driver" />
                                            <SelectInput
                                                id="sql_driver"
                                                name="sql_driver"
                                                value={data.sql_driver}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('sql_driver', e.target.value)}
                                            >
                                                <option value="sqlite">SQLite</option>
                                                <option value="mysql">MySQL</option>
                                                <option value="pgsql">PostgreSQL</option>
                                            </SelectInput>
                                            <InputError message={errors.sql_driver} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="sql_server" value="SQL Server" />
                                            <TextInput
                                                id="sql_server"
                                                type="text"
                                                name="sql_server"
                                                value={data.sql_server}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('sql_server', e.target.value)}
                                            />
                                            <InputError message={errors.sql_server} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="sql_port" value="SQL Port" />
                                            <TextInput
                                                id="sql_port"
                                                type="number"
                                                name="sql_port"
                                                value={data.sql_port}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('sql_port', e.target.value)}
                                            />
                                            <InputError message={errors.sql_port} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="sql_database" value="SQL Database" />
                                            <TextInput
                                                id="sql_database"
                                                type="text"
                                                name="sql_database"
                                                value={data.sql_database}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('sql_database', e.target.value)}
                                            />
                                            <InputError message={errors.sql_database} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="sql_username" value="SQL Username" />
                                            <TextInput
                                                id="sql_username"
                                                type="text"
                                                name="sql_username"
                                                value={data.sql_username}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('sql_username', e.target.value)}
                                            />
                                            <InputError message={errors.sql_username} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="sql_password" value="SQL Password" />
                                            <TextInput
                                                id="sql_password"
                                                type="password"
                                                name="sql_password"
                                                value={data.sql_password}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('sql_password', e.target.value)}
                                            />
                                            <InputError message={errors.sql_password} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="sql_read_groups"
                                                name="sql_read_groups"
                                                checked={data.sql_read_groups}
                                                onChange={(e) => setData('sql_read_groups', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="sql_read_groups" value="Read Groups" className="ml-2" />
                                            <InputError message={errors.sql_read_groups} className="mt-2" />
                                        </div>

                                        <div className="flex items-center">
                                            <Checkbox
                                                id="sql_delete_stale_sessions"
                                                name="sql_delete_stale_sessions"
                                                checked={data.sql_delete_stale_sessions}
                                                onChange={(e) => setData('sql_delete_stale_sessions', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="sql_delete_stale_sessions" value="Delete Stale Sessions" className="ml-2" />
                                            <InputError message={errors.sql_delete_stale_sessions} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* LDAP Settings */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">LDAP Settings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center">
                                            <Checkbox
                                                id="ldap_enabled"
                                                name="ldap_enabled"
                                                checked={data.ldap_enabled}
                                                onChange={(e) => setData('ldap_enabled', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="ldap_enabled" value="Enable LDAP" className="ml-2" />
                                            <InputError message={errors.ldap_enabled} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="ldap_server" value="LDAP Server" />
                                            <TextInput
                                                id="ldap_server"
                                                type="text"
                                                name="ldap_server"
                                                value={data.ldap_server}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('ldap_server', e.target.value)}
                                            />
                                            <InputError message={errors.ldap_server} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="ldap_port" value="LDAP Port" />
                                            <TextInput
                                                id="ldap_port"
                                                type="number"
                                                name="ldap_port"
                                                value={data.ldap_port}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('ldap_port', e.target.value)}
                                            />
                                            <InputError message={errors.ldap_port} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="ldap_base_dn" value="Base DN" />
                                            <TextInput
                                                id="ldap_base_dn"
                                                type="text"
                                                name="ldap_base_dn"
                                                value={data.ldap_base_dn}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('ldap_base_dn', e.target.value)}
                                            />
                                            <InputError message={errors.ldap_base_dn} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="ldap_bind_dn" value="Bind DN" />
                                            <TextInput
                                                id="ldap_bind_dn"
                                                type="text"
                                                name="ldap_bind_dn"
                                                value={data.ldap_bind_dn}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('ldap_bind_dn', e.target.value)}
                                            />
                                            <InputError message={errors.ldap_bind_dn} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="ldap_bind_pw" value="Bind Password" />
                                            <TextInput
                                                id="ldap_bind_pw"
                                                type="password"
                                                name="ldap_bind_pw"
                                                value={data.ldap_bind_pw}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('ldap_bind_pw', e.target.value)}
                                            />
                                            <InputError message={errors.ldap_bind_pw} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="ldap_filter" value="LDAP Filter" />
                                            <TextInput
                                                id="ldap_filter"
                                                type="text"
                                                name="ldap_filter"
                                                value={data.ldap_filter}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('ldap_filter', e.target.value)}
                                            />
                                            <InputError message={errors.ldap_filter} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Dynamic Client Settings */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Dynamic Client Settings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center">
                                            <Checkbox
                                                id="dynamic_clients"
                                                name="dynamic_clients"
                                                checked={data.dynamic_clients}
                                                onChange={(e) => setData('dynamic_clients', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="dynamic_clients" value="Enable Dynamic Clients" className="ml-2" />
                                            <InputError message={errors.dynamic_clients} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="dynamic_clients_dir" value="Dynamic Clients Directory" />
                                            <TextInput
                                                id="dynamic_clients_dir"
                                                type="text"
                                                name="dynamic_clients_dir"
                                                value={data.dynamic_clients_dir}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('dynamic_clients_dir', e.target.value)}
                                            />
                                            <InputError message={errors.dynamic_clients_dir} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Save Configuration
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 