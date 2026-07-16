// components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { blogService } from '../services/blogService';

const AdminRoute = ({ children }) => {
  const isAuthenticated = blogService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;