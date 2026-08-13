import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Home from './components/Home.jsx';

// Inline ProtectedRoute component
function ProtectedRoute({ children }) {
  const user = localStorage.getItem('loggedInUser');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Inline PublicRoute component
function PublicRoute({ children }) {
  const user = localStorage.getItem('loggedInUser');
  if (user) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

export default function App() {
  const handleLoginSuccess = (email) => {
    localStorage.setItem('loggedInUser', email);
    window.location.href = '/home';
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login onLogin={handleLoginSuccess} />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup onSignup={handleLoginSuccess} />
            </PublicRoute>
          }
        />

        {/* Protected Home Route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}