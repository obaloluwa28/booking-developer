// pages/AccountPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Trash2, AlertTriangle, X } from 'lucide-react';
import { useAuth } from '../components/AuthContext';

const AccountPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

    // Handle Export Account Data
    const handleExportData = async () => {
        setIsExporting(true);
        setError('');
        
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:5000/api/auth/user/export-data', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to export data');
            }

            const data = await response.json();
            
            // Create and download JSON file
            const jsonStr = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `user-data-${user?.username || 'user'}-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
        } catch (error) {
            setError(error.message || 'Failed to export account data. Please try again.');
            console.error('Export error:', error);
        } finally {
            setIsExporting(false);
        }
    };

    // Handle Delete Account
    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        setError('');
        
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:5000/api/auth/user/delete-account', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete account');
            }

            // Logout and redirect to home
            logout();
            navigate('/');
            
        } catch (error) {
            setError(error.message || 'Failed to delete account. Please try again.');
            console.error('Delete account error:', error);
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    // Get user's full name
    const getFullName = () => {
        return user?.full_name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || user?.username || 'User';
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My account</h1>
                </div>

                {/* Manage Your Account Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-xl font-semibold text-gray-900">Manage your account</h2>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        {/* Export Data Section */}
                        <div className="border-b border-gray-200 pb-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <Download size={20} className="text-blue-600 mr-2" />
                                        <h3 className="text-lg font-medium text-gray-900">Export data</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Effortlessly export your user account data to a JSON file.
                                    </p>
                                </div>
                                <button
                                    onClick={handleExportData}
                                    disabled={isExporting}
                                    className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isExporting ? 'Exporting...' : 'Export Account Data'}
                                </button>
                            </div>
                        </div>

                        {/* Delete Account Section */}
                        <div>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <Trash2 size={20} className="text-red-600 mr-2" />
                                        <h3 className="text-lg font-medium text-gray-900">Delete account</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        In order to delete your account click the button below. All data associated with your account will be erased. 
                                        Please note this action is permanent and cannot be undone.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="ml-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Account Information Section */}
                <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
                    </div>
                    <div className="p-6">
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                <dd className="mt-1 text-sm text-gray-900">{getFullName()}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Username</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user?.username}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Company</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user?.company || 'Not specified'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Account Created</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Role</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        user?.role === 'admin' 
                                            ? 'bg-purple-100 text-purple-800' 
                                            : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {user?.role || 'User'}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {/* Delete Account Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <div className="flex items-center">
                                <AlertTriangle className="text-red-600 mr-2" size={24} />
                                <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
                            </div>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-4">
                            <p className="text-gray-700 mb-4">
                                Are you sure you want to delete your account? This action is <strong className="text-red-600">permanent</strong> and cannot be undone.
                            </p>
                            <p className="text-sm text-gray-500 mb-4">
                                All your data will be permanently removed from our system.
                            </p>
                        </div>
                        
                        <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={isDeleting}
                                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {isDeleting ? 'Deleting...' : 'Yes, Delete My Account'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountPage;