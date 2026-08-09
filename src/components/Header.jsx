import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <header style={{ 
      display: 'flex', 
      justify: 'space-between', 
      alignItems: 'center', 
      padding: '10px 20px', 
      background: '#f4f4f4', 
      borderBottom: '1px solid #ccc' 
    }}>
      <h3>React App</h3>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '15px' }}>Logged in as: <b>{user.email || 'User'}</b></span>
            <button 
              onClick={handleLogoutClick}
              style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} style={{ marginRight: '10px', cursor: 'pointer' }}>Login</button>
            <button onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>Signup</button>
          </>
        )}
      </div>
    </header>
  );
}