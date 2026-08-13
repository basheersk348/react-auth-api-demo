import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem('loggedInUser'));

  if (isAuthenticated) {
    // If user is already logged in, redirect away from Login/Signup to Home
    return <Navigate to="/home" replace />;
  }

  return children;
}