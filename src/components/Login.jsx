import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve stored user data
    const savedUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (!savedUser) {
      setError('No registered account found. Please sign up first.');
      return;
    }

    // Validate credentials
    if (savedUser.email !== email || savedUser.password !== password) {
      setError('Invalid email or password!');
      return;
    }

    setError('');
    if (onLogin) {
      onLogin(savedUser);
    }

    navigate('/home');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Log In</h2>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>
          Log In
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Don't have an account?{' '}
        <span
          onClick={() => navigate('/signup')}
          style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}