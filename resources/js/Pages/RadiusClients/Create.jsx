import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        ip_address: '',
        secret: '',
        shortname: '',
        nas_type: '',
        comment: '',
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
                                    />
                                    <InputError message={errors.ip_address} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="secret" value="Secret" />
                                    <TextInput
                                        id="secret"
                                        type="password"
                                        name="secret"
                                        value={data.secret}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('secret', e.target.value)}
                                        required
                                    />
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
                                    />
                                    <InputError message={errors.nas_type} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="comment" value="Comment" />
                                    <textarea
                                        id="comment"
                                        name="comment"
                                        value={data.comment}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) => setData('comment', e.target.value)}
                                        rows="3"
                                    />
                                    <InputError message={errors.comment} className="mt-2" />
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