import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';

export default function Signup({ onSignup, onNavigate }) {
  // Form input state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // 1. State for fetched API data
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data automatically when this page opens
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json()) // Convert response to JavaScript object
      .then((data) => {
        setPostData(data); // Save fetched data in state
        setLoading(false); // Turn off loading message
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
      <Header title="Welcome to Sign Up" onNavigate={onNavigate} />
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <p>
          Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </p>
        <p>
          Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </p>
        <p>
          Confirm Password: <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </p>
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account?{' '}
        <button type="button" onClick={() => onNavigate('login')}>
          Go to Login
        </button>
      </p>

      <hr style={{ margin: '30px 0' }} />

      {/* 3. Render Fetched API Data below the form */}
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