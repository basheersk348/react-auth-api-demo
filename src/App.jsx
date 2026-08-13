import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Home from './components/Home.jsx';

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('loggedInUser');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

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
    window.location.href = `${process.env.PUBLIC_URL}/home`;
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = `${process.env.PUBLIC_URL}/login`;
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

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

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}