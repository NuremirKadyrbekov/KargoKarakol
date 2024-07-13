import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/KargoKarakol" />;
  }
  return children;
};

const AdminRoute = ({ isAuthenticated, children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/UserPage" />;
  }
  return children;
};

export { ProtectedRoute, AdminRoute };
