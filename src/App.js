import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute/ProtectedRoute';
import Home from './components/Home/Home';
import Auth from './components/auth/Auth';
import UserPage from './components/UserPage/UserPage';
import AdminPanel from './components/Admin/AdminPanel';
import Register from './components/auth/Register'; // Импортируем компонент регистрации

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    console.log('Auth Status ffff:', authStatus); // Выводим статус аутентификации
    setIsAuthenticated(authStatus);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("Auth Status sss:", isAuthenticated); // Добавьте эту строку
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router basename='KargoKarakol'>
      <Routes>
        <Route path="/" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userpage"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute isAuthenticated={isAuthenticated}>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route path="/register" element={<Register />} /> {/* Новый маршрут регистрации */}
      </Routes>
    </Router>
  );
};

export default App;
