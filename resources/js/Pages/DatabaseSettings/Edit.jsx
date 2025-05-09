import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, setting }) {
    const { data, setData, put, processing, errors } = useForm({
        driver: setting.driver,
        host: setting.host || '',
        port: setting.port || '',
        database: setting.database || '',
        username: setting.username || '',
        password: setting.password || '',
        charset: setting.charset,
        collation: setting.collation,
        prefix: setting.prefix,
        is_active: setting.is_active,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('database-settings.update', setting.id));
    };

    const handleDriverChange = (e) => {
        const driver = e.target.value;
        setData('driver', driver);
        
        // Reset fields when switching to SQLite
        if (driver === 'sqlite') {
            setData({
                ...data,
                driver,
                host: '',
                port: '',
                database: '',
                username: '',
                password: '',
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Database Setting</h2>}
        >
            <Head title="Edit Database Setting" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <InputLabel htmlFor="driver" value="Database Driver" />
                                    <select
                                        id="driver"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.driver}
                                        onChange={handleDriverChange}
                                    >
                                        <option value="sqlite">SQLite</option>
                                        <option value="mysql">MySQL</option>
                                        <option value="pgsql">PostgreSQL</option>
                                        <option value="oracle">Oracle</option>
                                    </select>
                                    <InputError message={errors.driver} className="mt-2" />
                                </div>

                                {data.driver !== 'sqlite' && (
                                    <>
                                        <div className="mb-4">
                                            <InputLabel htmlFor="host" value="Host" />
                                            <TextInput
                                                id="host"
                                                type="text"
                                                name="host"
                                                value={data.host}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('host', e.target.value)}
                                            />
                                            <InputError message={errors.host} className="mt-2" />
                                        </div>

                                        <div className="mb-4">
                                            <InputLabel htmlFor="port" value="Port" />
                                            <TextInput
                                                id="port"
                                                type="number"
                                                name="port"
                                                value={data.port}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('port', e.target.value)}
                                            />
                                            <InputError message={errors.port} className="mt-2" />
                                        </div>

                                        <div className="mb-4">
                                            <InputLabel htmlFor="database" value="Database Name" />
                                            <TextInput
                                                id="database"
                                                type="text"
                                                name="database"
                                                value={data.database}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('database', e.target.value)}
                                            />
                                            <InputError message={errors.database} className="mt-2" />
                                        </div>

                                        <div className="mb-4">
                                            <InputLabel htmlFor="username" value="Username" />
                                            <TextInput
                                                id="username"
                                                type="text"
                                                name="username"
                                                value={data.username}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('username', e.target.value)}
                                            />
                                            <InputError message={errors.username} className="mt-2" />
                                        </div>

                                        <div className="mb-4">
                                            <InputLabel htmlFor="password" value="Password" />
                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Leave blank to keep current password"
                                            />
                                            <InputError message={errors.password} className="mt-2" />
                                        </div>
                                    </>
                                )}

                                <div className="mb-4">
                                    <InputLabel htmlFor="charset" value="Character Set" />
                                    <TextInput
                                        id="charset"
                                        type="text"
                                        name="charset"
                                        value={data.charset}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('charset', e.target.value)}
                                    />
                                    <InputError message={errors.charset} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="collation" value="Collation" />
                                    <TextInput
                                        id="collation"
                                        type="text"
                                        name="collation"
                                        value={data.collation}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('collation', e.target.value)}
                                    />
                                    <InputError message={errors.collation} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="prefix" value="Table Prefix" />
                                    <TextInput
                                        id="prefix"
                                        type="text"
                                        name="prefix"
                                        value={data.prefix}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('prefix', e.target.value)}
                                    />
                                    <InputError message={errors.prefix} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Set as active configuration</span>
                                    </label>
                                    <InputError message={errors.is_active} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Update Setting
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