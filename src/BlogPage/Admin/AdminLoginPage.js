// src/BlogPage/Admin/AdminLoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn, Eye, EyeOff } from 'lucide-react';
import { blogService } from '../services/blogService';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await blogService.login(formData.username, formData.password);
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1a2b4c] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a2b4c]">Admin Login</h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a2b4c] text-white py-2 rounded-lg hover:bg-[#2a3b5c] disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? 'Logging in...' : (
              <>
                <LogIn size={18} className="mr-2" />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          Demo: admin / admin123
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;