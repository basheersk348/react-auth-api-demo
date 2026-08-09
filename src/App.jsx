import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Home from './components/Home.jsx';

// Child component inside App to access useNavigate hook safely
function AppRoutes() {
  const navigate = useNavigate();

  // Navigation handlers
  const handleAuthSuccess = (userEmail) => {
    localStorage.setItem('loggedInUser', userEmail);
    navigate('/home'); // Programmatic navigation
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login'); // Programmatic navigation
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleAuthSuccess} />} />
      <Route path="/login" element={<Login onLogin={handleAuthSuccess} />} />
      <Route path="/signup" element={<Signup onSignup={handleAuthSuccess} />} />
      <Route path="/home" element={<Home onLogout={handleLogout} />} />
    </Routes>
  );
}

// Parent Component
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}