// components/UserDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, CreditCard, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from './AuthContext';

const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // Use context

    // Get initials for avatar
    const getInitials = () => {
        if (user?.first_name && user?.last_name) {
            return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
        }
        if (user?.full_name) {
            const nameParts = user.full_name.split(' ');
            if (nameParts.length >= 2) {
                return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
            }
            return user.full_name.charAt(0).toUpperCase();
        }
        if (user?.username) {
            return user.username.charAt(0).toUpperCase();
        }
        return 'U';
    };

    // Handle sign out
    const handleSignOut = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                await fetch('http://localhost:5000/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Use context logout
            logout();
            // Redirect to home
            navigate('/');
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 focus:outline-none hover:opacity-80 transition-opacity"
                aria-label="User menu"
            >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                    {getInitials()}
                </div>
                <ChevronDown
                    size={16}
                    className={`text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">
                            {user.full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                    </div>

                    <div className="py-1">
                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            <User size={16} className="mr-3" />
                            Profile details
                        </Link>

                        <Link
                            to="/account"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            <Settings size={16} className="mr-3" />
                            Manage your account
                        </Link>

                        <Link
                            to="/applications"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            <CreditCard size={16} className="mr-3" />
                            Application
                        </Link>

                        <div className="border-t border-gray-200 my-1"></div>

                        <button
                            onClick={handleSignOut}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                        >
                            <LogOut size={16} className="mr-3" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;