// pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Save, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../components/AuthContext';

const ProfilePage = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        companyAddress: '',
        registrationNumber: '',
        businessType: '',
        mobilePhone: '',
        language: 'English'
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.first_name || '',
                lastName: user.last_name || '',
                email: user.email || '',
                company: user.company || '',
                companyAddress: user.company_address || '',
                registrationNumber: user.registration_number || '',
                businessType: user.business_type || '',
                mobilePhone: user.mobile_phone || '',
                language: user.language || 'English'
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:5000/api/auth/user/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    company: formData.company,
                    company_address: formData.companyAddress,
                    registration_number: formData.registrationNumber,
                    business_type: formData.businessType,
                    mobile_phone: formData.mobilePhone,
                    language: formData.language
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update profile');
            }

            const data = await response.json();
            updateUser(data.user);
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError(error.message || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = () => {
        navigate('/reset-password');
    };

    const handleEndAllSessions = async () => {
        if (window.confirm('Are you sure you want to end all active sessions? You will be logged out from all devices.')) {
            try {
                const token = localStorage.getItem('accessToken');
                await fetch('http://localhost:5000/api/auth/end-all-sessions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                // Log out the user
                localStorage.clear();
                window.location.href = '/auth';
            } catch (error) {
                console.error('Failed to end sessions:', error);
            }
        }
    };

    const handleSignOut = () => {
        if (window.confirm('Are you sure you want to sign out?')) {
            localStorage.clear();
            window.location.href = '/auth';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Account</h1>
                </div>

                {/* Personal Information Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900">Business Information</h2>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                <Edit size={16} className="mr-1" />
                                Edit
                            </button>
                        ) : (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center text-gray-600 hover:text-gray-700 transition-colors"
                                >
                                    <X size={16} className="mr-1" />
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className="flex items-center text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50"
                                >
                                    <Save size={16} className="mr-1" />
                                    {isLoading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <div className="p-6">
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

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                ) : (
                                    <p className="text-gray-900">{formData.firstName || '-'}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                ) : (
                                    <p className="text-gray-900">{formData.lastName || '-'}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <button
                                    onClick={handleResetPassword}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    Reset
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <p className="text-gray-900">{formData.email}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Primary email
                                </label>
                                <p className="text-gray-900">{formData.email}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Secondary email
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="secondaryEmail"
                                        value={formData.secondaryEmail || ''}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Optional"
                                    />
                                ) : (
                                    <p className="text-gray-500">{formData.secondaryEmail || 'Not set'}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile phone
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="mobilePhone"
                                        value={formData.mobilePhone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="+1 234 567 8900"
                                    />
                                ) : (
                                    <p className="text-gray-500">{formData.mobilePhone || 'Not set'}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Company name"
                                    />
                                ) : (
                                    <p className="text-gray-900">{formData.company || '-'}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Address
                                </label>
                                {isEditing ? (
                                    <textarea
                                        name="companyAddress"
                                        value={formData.companyAddress}
                                        onChange={handleInputChange}
                                        rows="2"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Street address, city, country, postal code"
                                    />
                                ) : (
                                    <p className="text-gray-900">{formData.companyAddress || '-'}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Registration Number
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="registrationNumber"
                                        value={formData.registrationNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Business registration number"
                                    />
                                ) : (
                                    <p className="text-gray-900">{formData.registrationNumber || '-'}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Business Type
                                </label>
                                {isEditing ? (
                                    <select
                                        name="businessType"
                                        value={formData.businessType}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select business type</option>
                                        <option value="Travel Agency">Travel Agency</option>
                                        <option value="OTA">OTA (Online Travel Agency)</option>
                                        <option value="Affiliate">Affiliate</option>
                                    </select>
                                ) : (
                                    <p className="text-gray-900">{formData.businessType || '-'}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    User type
                                </label>
                                <p className="text-gray-900 capitalize">{user?.role || 'self-registered'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-xl font-semibold text-gray-900">Security</h2>
                    </div>
                    
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <div>
                                    <p className="font-medium text-gray-900">End All Sessions</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        For your security, you can end all active sessions on every device that has accessed your account.
                                    </p>
                                </div>
                                <button
                                    onClick={handleEndAllSessions}
                                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
                                >
                                    End All Sessions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Display Language Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-xl font-semibold text-gray-900">Display Language</h2>
                    </div>
                    
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium text-gray-900">Language</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Your default language has been automatically set by your browser. To change your language please edit and save your desired display language.
                                </p>
                            </div>
                            {isEditing ? (
                                <select
                                    name="language"
                                    value={formData.language}
                                    onChange={handleInputChange}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="English">English</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="French">French</option>
                                    <option value="German">German</option>
                                    <option value="Chinese">Chinese</option>
                                    <option value="Japanese">Japanese</option>
                                </select>
                            ) : (
                                <p className="text-gray-900">{formData.language}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sign Out Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={handleSignOut}
                        className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;