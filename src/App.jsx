import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup onSignup={(data) => setUser(data)} />} />
        <Route path="/signup" element={<Signup onSignup={(data) => setUser(data)} />} />
        <Route path="/login" element={<Login onLogin={(data) => setUser(data)} />} />
        <Route 
          path="/home" 
          element={<Home user={user} onLogout={handleLogout} />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}