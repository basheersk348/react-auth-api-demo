import React from 'react';
import Header from './Header';
import PostData from './PostData';

export default function Home({ user, onLogout }) {
  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <h2>Dashboard</h2>
        <PostData />
      </div>
    </div>
  );
}