import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show({ auth, method }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Authentication Method Details</h2>}
        >
            <Head title="Authentication Method Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <Link
                                    href={route('authentication-methods.index')}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    ← Back to List
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{method.name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Type</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{method.type}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Priority</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{method.priority}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                                            <dd className="mt-1">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        method.is_active
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {method.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Configuration</h3>
                                    <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                                        <code className="text-sm text-gray-900">
                                            {JSON.stringify(method.config, null, 2)}
                                        </code>
                                    </pre>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-4">
                                <Link
                                    href={route('authentication-methods.edit', method.id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Edit Method
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 