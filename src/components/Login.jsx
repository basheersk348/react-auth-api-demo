import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      setError('');
      onLogin(email);
    } else {
      setError('Invalid email or password!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Header title="Welcome to Login" />
      <h2>Login</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <p>
          Email:{' '}
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </p>
        <p>
          Password:{' '}
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </p>
        <button type="submit">Log In</button>
      </form>

      <p>
        Need an account? <Link to="/signup">Go to Sign Up</Link>
      </p>
    </div>
  );
}