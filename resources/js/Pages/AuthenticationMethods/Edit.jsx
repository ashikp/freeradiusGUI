import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';

export default function Edit({ auth, method }) {
    const { data, setData, put, processing, errors } = useForm({
        name: method.name,
        type: method.type,
        priority: method.priority,
        is_active: method.is_active,
        config: method.config,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('authentication-methods.update', method.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Authentication Method</h2>}
        >
            <Head title="Edit Authentication Method" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="type" value="Type" />
                                    <select
                                        id="type"
                                        name="type"
                                        value={data.type}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) => setData('type', e.target.value)}
                                        required
                                    >
                                        <option value="">Select a type</option>
                                        <option value="ldap">LDAP</option>
                                        <option value="radius">RADIUS</option>
                                        <option value="local">Local</option>
                                        <option value="pam">PAM</option>
                                    </select>
                                    <InputError message={errors.type} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="priority" value="Priority" />
                                    <TextInput
                                        id="priority"
                                        type="number"
                                        name="priority"
                                        value={data.priority}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('priority', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.priority} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="config" value="Configuration" />
                                    <textarea
                                        id="config"
                                        name="config"
                                        value={JSON.stringify(data.config, null, 2)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-mono"
                                        onChange={(e) => {
                                            try {
                                                setData('config', JSON.parse(e.target.value));
                                            } catch (error) {
                                                // Keep the invalid JSON as a string
                                                setData('config', e.target.value);
                                            }
                                        }}
                                        rows="10"
                                    />
                                    <InputError message={errors.config} className="mt-2" />
                                </div>

                                <div className="flex items-center">
                                    <Checkbox
                                        id="is_active"
                                        name="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                    />
                                    <InputLabel htmlFor="is_active" value="Active" className="ml-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        disabled={processing}
                                    >
                                        Update Method
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 