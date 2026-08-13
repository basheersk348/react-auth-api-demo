import React from 'react';

export default function Home({ onLogout }) {
  const username = localStorage.getItem('loggedInUser') || 'User';

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Home Page</h1>
      <hr />
      <h2>Welcome, <span style={{ color: '#007bff' }}>{username}</span>!</h2>
      <p>You are logged into a protected route.</p>

      <button
        type="button"
        onClick={onLogout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Log Out
      </button>
    </div>
  );
}