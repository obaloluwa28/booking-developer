// pages/Application.jsx
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Copy, Check, AlertCircle, Eye, EyeOff, Key, Info } from 'lucide-react';
// import { useAuth } from '../components/AuthContext'; // Comment out if not used

const Application = () => {
    // const { user } = useAuth(); // Comment out since not used
  //  const navigate = useNavigate(); // Keep this if you plan to use it later
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newAppName, setNewAppName] = useState('');
    const [copiedField, setCopiedField] = useState(null);
    const [showPasswords, setShowPasswords] = useState({});

    // Generate random 32-character User ID
    const generateUserId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 32; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    // Generate random 8-character Password
    const generatePassword = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    // Fetch applications on load
    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:5000/api/auth/applications', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }

            const data = await response.json();
            setApplications(data.applications || []);
        } catch (error) {
            console.error('Fetch applications error:', error);
            setError('Failed to load applications');
        } finally {
            setIsLoading(false);
        }
    };

    // Add new application
    const handleAddApplication = async () => {
        if (!newAppName.trim()) {
            setError('Please enter an application name');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('accessToken');
            const userId = generateUserId();
            const password = generatePassword();

            const response = await fetch('http://localhost:5000/api/auth/applications', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: newAppName,
                    user_id: userId,
                    password: password
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create application');
            }

            const data = await response.json();
            setApplications([data.application, ...applications]);
            setSuccess('Application created successfully!');
            setNewAppName('');
            setShowAddModal(false);

            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError(error.message || 'Failed to create application');
        } finally {
            setIsLoading(false);
        }
    };

    // Delete application
    const handleDeleteApplication = async (appId) => {
        if (!window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5000/api/auth/applications/${appId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete application');
            }

            setApplications(applications.filter(app => app.id !== appId));
            setSuccess('Application deleted successfully!');

            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError(error.message || 'Failed to delete application');
        } finally {
            setIsLoading(false);
        }
    };

    // Copy to clipboard
    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    // Toggle password visibility
    const togglePasswordVisibility = (appId) => {
        setShowPasswords(prev => ({
            ...prev,
            [appId]: !prev[appId]
        }));
    };

    const maxApplications = 2;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My account</h1>
                </div>

                {/* Profile Details Section - Commented out but kept for reference */}
                {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-xl font-semibold text-gray-900">Profile details</h2>
                        <p className="text-sm text-gray-500 mt-1">Manage your account</p>
                    </div>
                    <div className="p-6">
                        <button
                            onClick={() => navigate('/profile')}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            Edit Profile →
                        </button>
                    </div>
                </div> */}

                {/* Applications Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-xl font-semibold text-gray-900">Applications</h2>
                    </div>

                    <div className="p-6">
                        {/* Info Note */}
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-start">
                                <Info size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-blue-800 mb-1">Using Application Credentials with REST APIs</p>
                                    <p className="text-sm text-blue-700">
                                        Application credentials allow you to use a test user ID and password with certain REST APIs—specifically those marked with the <strong>Try it Out</strong> flag at the top of the page.
                                    </p>
                                    <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
                                        <li>The token is generated automatically and is not linked to any production account.</li>
                                        <li>You can also use your own application credentials.</li>
                                        <li>A maximum of two applications can be stored per account, including the automated test credentials.</li>
                                        <li>You may need to create new test credentials as they are periodically reset.</li>
                                    </ul>
                                    <p className="text-sm text-blue-700 mt-2">
                                        Further information on Authentication can be found here{' '}
                                        <button 
                                            onClick={() => window.location.href = '/guides/authentication'}
                                            className="text-blue-800 underline hover:text-blue-900"
                                        >
                                            Authentication for Wisefares APIs
                                        </button>{' '}
                                        | Dev Studio
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Error/Success Messages */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
                                <AlertCircle size={16} className="text-red-600 mr-2" />
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-sm text-green-600">{success}</p>
                            </div>
                        )}

                        {/* Applications List */}
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-600">
                                    You can configure maximum of <strong>{maxApplications}</strong> applications.
                                </p>
                                {applications.length < maxApplications && (
                                    <button
                                        onClick={() => setShowAddModal(true)}
                                        className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        <Plus size={16} className="mr-2" />
                                        Add New Application
                                    </button>
                                )}
                            </div>

                            {isLoading && applications.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                    <p className="text-gray-500 mt-2">Loading applications...</p>
                                </div>
                            ) : applications.length === 0 ? (
                                <div className="text-center py-8">
                                    <Key size={48} className="text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500">No applications created yet.</p>
                                    <button
                                        onClick={() => setShowAddModal(true)}
                                        className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                    >
                                        Create your first application →
                                    </button>
                                </div>
                            ) : (
                                applications.map((app) => (
                                    <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{app.name}</h3>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Created: {new Date(app.created_at).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteApplication(app.id)}
                                                className="text-red-600 hover:text-red-700 transition-colors"
                                                title="Delete Application"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {/* User ID */}
                                            <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500 mb-1">User ID</p>
                                                    <code className="text-sm font-mono text-gray-800 break-all">
                                                        {app.user_id}
                                                    </code>
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(app.user_id, `user_${app.id}`)}
                                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                                    title="Copy User ID"
                                                >
                                                    {copiedField === `user_${app.id}` ? (
                                                        <Check size={16} className="text-green-600" />
                                                    ) : (
                                                        <Copy size={16} />
                                                    )}
                                                </button>
                                            </div>

                                            {/* Password */}
                                            <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500 mb-1">Password</p>
                                                    <code className="text-sm font-mono text-gray-800">
                                                        {showPasswords[app.id] ? app.password : '••••••••'}
                                                    </code>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => togglePasswordVisibility(app.id)}
                                                        className="text-gray-400 hover:text-gray-600"
                                                        title={showPasswords[app.id] ? "Hide Password" : "Show Password"}
                                                    >
                                                        {showPasswords[app.id] ? (
                                                            <EyeOff size={16} />
                                                        ) : (
                                                            <Eye size={16} />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => copyToClipboard(app.password, `pass_${app.id}`)}
                                                        className="text-gray-400 hover:text-gray-600"
                                                        title="Copy Password"
                                                    >
                                                        {copiedField === `pass_${app.id}` ? (
                                                            <Check size={16} className="text-green-600" />
                                                        ) : (
                                                            <Copy size={16} />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Delete Application Note */}
                        {applications.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => {
                                        if (applications.length === 1) {
                                            handleDeleteApplication(applications[0].id);
                                        } else {
                                            setError('Please click the trash icon on the specific application you want to delete');
                                            setTimeout(() => setError(''), 3000);
                                        }
                                    }}
                                    className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
                                >
                                    <Trash2 size={16} className="mr-2" />
                                    Delete Application
                                </button>
                                <p className="text-xs text-gray-500 mt-1">
                                    Note: Deleting an application will permanently remove its credentials.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Application Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Application</h3>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Application Name
                                </label>
                                <input
                                    type="text"
                                    value={newAppName}
                                    onChange={(e) => setNewAppName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., My Test App, Production API, etc."
                                    autoFocus
                                />
                            </div>

                            <div className="mb-4 p-3 bg-blue-50 rounded-md">
                                <p className="text-sm text-blue-700">
                                    <strong>Note:</strong> When you create an application, we'll automatically generate:
                                </p>
                                <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
                                    <li>32-character User ID</li>
                                    <li>8-character Password</li>
                                </ul>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setNewAppName('');
                                        setError('');
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddApplication}
                                    disabled={isLoading || !newAppName.trim()}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Creating...' : 'Create Application'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Application;