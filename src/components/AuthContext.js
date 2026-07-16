// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on initial load
        const checkAuth = async () => {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('accessToken');
            const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            if (storedUser && loggedIn && token) {
                try {
                    // Fetch fresh user data from backend to get all fields
                    const response = await fetch('http://localhost:5000/api/auth/user/profile', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        // Update user with fresh data from backend
                        setUser(data.user);
                        localStorage.setItem('user', JSON.stringify(data.user));
                        setIsLoggedIn(true);
                        console.log('✅ User data refreshed from backend:', data.user);
                    } else if (response.status === 401) {
                        // Token expired, try to refresh
                        const newToken = await refreshToken();
                        if (newToken) {
                            // Retry fetching profile
                            const retryResponse = await fetch('http://localhost:5000/api/auth/user/profile', {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer ${newToken}`,
                                    'Content-Type': 'application/json'
                                }
                            });
                            
                            if (retryResponse.ok) {
                                const data = await retryResponse.json();
                                setUser(data.user);
                                localStorage.setItem('user', JSON.stringify(data.user));
                                setIsLoggedIn(true);
                            } else {
                                // If refresh fails, use stored data
                                setUser(JSON.parse(storedUser));
                                setIsLoggedIn(true);
                            }
                        } else {
                            // If refresh fails, use stored data
                            setUser(JSON.parse(storedUser));
                            setIsLoggedIn(true);
                        }
                    } else {
                        // If API fails, use stored data
                        setUser(JSON.parse(storedUser));
                        setIsLoggedIn(true);
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    // Fallback to stored user data
                    setUser(JSON.parse(storedUser));
                    setIsLoggedIn(true);
                }
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
            setLoading(false);
        };
        
        // Helper function to refresh token
        const refreshToken = async () => {
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) return null;
                
                const response = await fetch('http://localhost:5000/api/auth/refresh-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ refreshToken })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    return data.accessToken;
                }
                return null;
            } catch (error) {
                console.error('Token refresh failed:', error);
                return null;
            }
        };
        
        checkAuth();
        
        // Listen for storage events (when auth changes in another tab)
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const login = async (userData, tokens) => {
        // Store tokens first
        if (tokens) {
            if (tokens.accessToken) localStorage.setItem('accessToken', tokens.accessToken);
            if (tokens.refreshToken) localStorage.setItem('refreshToken', tokens.refreshToken);
        }
        
        // Fetch complete user profile from backend
        try {
            const token = tokens?.accessToken || localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:5000/api/auth/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                const fullUserData = data.user;
                localStorage.setItem('user', JSON.stringify(fullUserData));
                setUser(fullUserData);
                console.log('✅ User logged in with full profile:', fullUserData);
            } else {
                // Fallback to provided user data
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                console.log('⚠️ Using provided user data:', userData);
            }
        } catch (error) {
            console.error('Error fetching full profile on login:', error);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        }
        
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setIsLoggedIn(false);
    };

    const updateUser = (userData) => {
        // Store the updated user data
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        console.log('✅ User data updated:', userData);
    };

    const refreshUserData = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) return null;
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                updateUser(data.user);
                return data.user;
            }
            return null;
        } catch (error) {
            console.error('Error refreshing user data:', error);
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isLoggedIn, 
            loading, 
            login, 
            logout, 
            updateUser,
            refreshUserData 
        }}>
            {children}
        </AuthContext.Provider>
    );
};