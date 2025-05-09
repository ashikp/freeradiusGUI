import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import { useState } from 'react';

export default function Create({ auth }) {
    const [showSecret, setShowSecret] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        ip_address: '',
        secret: '',
        shortname: '',
        nas_type: '',
        description: '',
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('radius-clients.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create RADIUS Client</h2>}
        >
            <Head title="Create RADIUS Client" />

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
                                        placeholder="Enter client name"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="ip_address" value="IP Address" />
                                    <TextInput
                                        id="ip_address"
                                        type="text"
                                        name="ip_address"
                                        value={data.ip_address}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('ip_address', e.target.value)}
                                        required
                                        placeholder="Enter IP address (e.g., 192.168.1.1)"
                                    />
                                    <InputError message={errors.ip_address} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="secret" value="Secret" />
                                    <div className="relative">
                                        <TextInput
                                            id="secret"
                                            type={showSecret ? "text" : "password"}
                                            name="secret"
                                            value={data.secret}
                                            className="mt-1 block w-full pr-10"
                                            onChange={(e) => setData('secret', e.target.value)}
                                            required
                                            placeholder="Enter RADIUS secret (min. 6 characters)"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowSecret(!showSecret)}
                                        >
                                            {showSecret ? (
                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    <InputError message={errors.secret} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="shortname" value="Shortname" />
                                    <TextInput
                                        id="shortname"
                                        type="text"
                                        name="shortname"
                                        value={data.shortname}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('shortname', e.target.value)}
                                        placeholder="Enter short name (optional)"
                                    />
                                    <InputError message={errors.shortname} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="nas_type" value="NAS Type" />
                                    <TextInput
                                        id="nas_type"
                                        type="text"
                                        name="nas_type"
                                        value={data.nas_type}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('nas_type', e.target.value)}
                                        placeholder="Enter NAS type (optional)"
                                    />
                                    <InputError message={errors.nas_type} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows="3"
                                        placeholder="Enter description (optional)"
                                    />
                                    <InputError message={errors.description} className="mt-2" />
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

                                <div className="flex items-center justify-end space-x-4 mt-4">
                                    <Link
                                        href={route('radius-clients.index')}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        disabled={processing}
                                    >
                                        Create Client
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