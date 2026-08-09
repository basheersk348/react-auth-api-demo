import React from 'react';

export default function Home({ onLogout }) {
  const username = localStorage.getItem('loggedInUser') || 'User';

  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome, <strong>{username}</strong>!</p>
      <button type="button" onClick={onLogout}>Log Out</button>
    </div>
  );
}