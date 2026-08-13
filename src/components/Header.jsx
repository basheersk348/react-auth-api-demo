import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ title, onLogout }) {
  const isLoggedIn = Boolean(localStorage.getItem('loggedInUser'));

  return (
    <header style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
      <h1>{title}</h1>
      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/home">Home</Link> | {' '}
            <button 
              type="button" 
              onClick={onLogout}
              style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/">Login</Link> | <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
      <hr />
    </header>
  );
}