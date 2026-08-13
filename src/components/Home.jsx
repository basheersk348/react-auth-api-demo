import React from 'react';
import Header from './Header.jsx';

export default function Home({ onLogout }) {
  const username = localStorage.getItem('loggedInUser') || 'User';

  return (
    <div style={{ padding: '20px' }}>
      <Header title="Dashboard" onLogout={onLogout} />
      
      <h2>Home Page</h2>
      <p style={{ fontSize: '18px' }}>
        Welcome back, <strong>{username}</strong>! 🎉
      </p>

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
          marginTop: '10px'
        }}
      >
        Log Out
      </button>
    </div>
  );
}