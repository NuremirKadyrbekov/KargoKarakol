import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (!isAuthenticated && !storedUser) {
    return <Navigate to="/admin" />;
  }
  return children;
};

const AdminRoute = ({ isAuthenticated, children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if ((!isAuthenticated && !storedUser) || !isAdmin) {
    return <Navigate to="/admin" />;
  }
  return children;
};

export { ProtectedRoute, AdminRoute };
