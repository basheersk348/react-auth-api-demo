import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';

export default function Signup({ onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((data) => {
        setPostData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setError('');
    localStorage.setItem('registeredUser', JSON.stringify({ email, password }));
    onSignup(email);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Header title="Welcome to Sign Up" />
      <h2>Sign Up</h2>

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
        <p>
          Confirm Password:{' '}
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </p>
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Go to Login</Link>
      </p>

      <hr style={{ margin: '30px 0' }} />

      <div style={{ border: '2px dashed #007bff', padding: '15px', borderRadius: '8px', maxWidth: '500px' }}>
        <h3>Fetched API Data Task</h3>
        {loading ? (
          <p>Loading data from server...</p>
        ) : postData ? (
          <div>
            <p><strong>Post ID:</strong> {postData.id}</p>
            <p><strong>Title:</strong> {postData.title}</p>
            <p><strong>Body:</strong> {postData.body}</p>
          </div>
        ) : (
          <p>Failed to load data.</p>
        )}
      </div>
    </div>
  );
}