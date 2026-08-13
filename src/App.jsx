import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Home from './components/Home.jsx';

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('loggedInUser');
  if (!user) {
    return <Navigate to="/" replace />;
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

function MainRoutes() {
  const navigate = useNavigate();

  const handleLoginSuccess = (email) => {
    localStorage.setItem('loggedInUser', email);
    navigate('/home');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <Routes>
      {/* Root URL http://localhost:3000 renders Login directly */}
      <Route
        path="/"
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <MainRoutes />
    </BrowserRouter>
  );
}