import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show({ auth, log }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Authentication Log Details</h2>}
        >
            <Head title="Authentication Log Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <Link
                                    href={route('authentication-logs.index')}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    ← Back to Logs
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Authentication Details</h3>
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Timestamp</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(log.created_at).toLocaleString()}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Username</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{log.username}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Client</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{log.client_name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Authentication Method</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{log.method_name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                                            <dd className="mt-1">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    log.is_successful
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {log.is_successful ? 'Success' : 'Failed'}
                                                </span>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">IP Address</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{log.ip_address}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">User Agent</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{log.user_agent || 'N/A'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Error Message</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{log.error_message || 'N/A'}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Request Attributes</dt>
                                            <dd className="mt-1">
                                                <pre className="text-sm text-gray-900 bg-gray-50 p-4 rounded-md overflow-x-auto">
                                                    {JSON.stringify(log.request_attributes, null, 2)}
                                                </pre>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Response Attributes</dt>
                                            <dd className="mt-1">
                                                <pre className="text-sm text-gray-900 bg-gray-50 p-4 rounded-md overflow-x-auto">
                                                    {JSON.stringify(log.response_attributes, null, 2)}
                                                </pre>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 