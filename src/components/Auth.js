// components/Auth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from './AuthContext';

const API_URL = 'http://localhost:5000/api';

const Auth = () => {
    const [authState, setAuthState] = useState('signin');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        company: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateSignIn = () => {
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = 'This field cannot be left blank';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePassword = () => {
        const newErrors = {};
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateSignUp = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignInNext = async (e) => {
        e.preventDefault();
        setApiError('');

        if (!validateSignIn()) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/signin/username`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: formData.username })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'An error occurred');
            }

            if (data.requiresPassword) {
                setAuthState('password');
            }
        } catch (error) {
            if (error.message.includes('429')) {
                setApiError('Too many failed attempts. Please try again after 15 minutes.');
            } else {
                setApiError(error.message || 'An error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

   // Update handleSignUp
  const handleSignUp = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateSignUp()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company || null,
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred during sign up');
      }

      // Use context login instead of direct localStorage
      login(data.user, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      });

      // Redirect to home page
      navigate('/');
      
    } catch (error) {
      setApiError(error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  // Update handlePasswordVerify
  const handlePasswordVerify = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validatePassword()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/signin/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          keepSignedIn
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Invalid username or password');
      }

      // Use context login instead of direct localStorage
      login(data.user, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      });

      // Redirect to home page
      navigate('/');
      
    } catch (error) {
      setApiError(error.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

    const handleUnlockAccount = async () => {
        if (!formData.username) {
            setApiError('Please enter your username');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/unlock-account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: formData.username })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'An error occurred');
            }

            setApiError('Unlock instructions sent to your email');
        } catch (error) {
            setApiError(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setApiError('');
    };

    const handleBackToSignIn = () => {
        setAuthState('signin');
        setErrors({});
        setApiError('');
        setFormData(prev => ({ ...prev, password: '' }));
    };

    return (
        <div className="min-h-screen bg-[#1a2b4c] flex flex-col justify-start pt-16 sm:pt-24 lg:pt-32 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">Wisefares</h1>
                    <h2 className="mt-2 text-xl text-white/90">Developer Hub</h2>
                </div>

                <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
                    {apiError && (
                        <div className={`mb-4 p-3 rounded-md text-sm ${apiError.includes('sent')
                                ? 'bg-green-50 text-green-800'
                                : 'bg-red-50 text-red-800'
                            }`}>
                            {apiError}
                        </div>
                    )}

                    {authState === 'signin' && (
                        <form className="space-y-6" onSubmit={handleSignInNext}>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Username or Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        className={`appearance-none block w-full px-3 py-2 border ${errors.username ? 'border-red-300' : 'border-gray-300'
                                            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100`}
                                        placeholder="Enter your username"
                                    />
                                    {errors.username && (
                                        <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="keep-signed-in"
                                    name="keep-signed-in"
                                    type="checkbox"
                                    checked={keepSignedIn}
                                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="keep-signed-in" className="ml-2 block text-sm text-gray-900">
                                    Keep me signed in
                                </label>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Verifying...' : 'Next'}
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={handleUnlockAccount}
                                    disabled={loading}
                                    className="text-sm text-blue-600 hover:text-blue-500 disabled:text-blue-300"
                                >
                                    Unlock account?
                                </button>
                                <button
                                    type="button"
                                    onClick={() => window.location.href = '/support'}
                                    className="text-sm text-gray-600 hover:text-gray-500 flex items-center"
                                >
                                    <HelpCircle size={16} className="mr-1" />
                                    Help
                                </button>
                            </div>

                            <div className="text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setAuthState('signup');
                                        setFormData({
                                            username: '',
                                            password: '',
                                            firstName: '',
                                            lastName: '',
                                            email: '',
                                            company: ''
                                        });
                                    }}
                                    className="text-blue-600 hover:text-blue-500 font-medium"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    )}

                    {authState === 'password' && (
                        <form className="space-y-6" onSubmit={handlePasswordVerify}>
                            <div className="mb-4">
                                <button
                                    type="button"
                                    onClick={handleBackToSignIn}
                                    className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                                >
                                    <ArrowLeft size={16} className="mr-1" />
                                    Back to sign in
                                </button>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'
                                            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10 disabled:bg-gray-100`}
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={16} className="text-gray-400" />
                                        ) : (
                                            <Eye size={16} className="text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Verifying...' : 'Verify'}
                                </button>
                            </div>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => {/* Handle forgot password */ }}
                                    className="text-sm text-blue-600 hover:text-blue-500"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        </form>
                    )}

                    {authState === 'signup' && (
                        <form className="space-y-6" onSubmit={handleSignUp}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                        First name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            disabled={loading}
                                            className={`appearance-none block w-full px-3 py-2 border ${errors.firstName ? 'border-red-300' : 'border-gray-300'
                                                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100`}
                                            placeholder="John"
                                        />
                                        {errors.firstName && (
                                            <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                        Last name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            disabled={loading}
                                            className={`appearance-none block w-full px-3 py-2 border ${errors.lastName ? 'border-red-300' : 'border-gray-300'
                                                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100`}
                                            placeholder="Doe"
                                        />
                                        {errors.lastName && (
                                            <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'
                                            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100`}
                                        placeholder="john.doe@example.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                    Company <span className="text-gray-400 font-normal">(Optional)</span>
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="company"
                                        name="company"
                                        type="text"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
                                        placeholder="Your company name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="signup-password"
                                        name="password"
                                        type={showSignUpPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'
                                            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10 disabled:bg-gray-100`}
                                        placeholder="Create a password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showSignUpPassword ? (
                                            <EyeOff size={16} className="text-gray-400" />
                                        ) : (
                                            <Eye size={16} className="text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Creating account...' : 'Sign Up'}
                                </button>
                            </div>

                            <div className="text-center text-sm text-gray-600">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={handleBackToSignIn}
                                    className="text-blue-600 hover:text-blue-500 font-medium"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;