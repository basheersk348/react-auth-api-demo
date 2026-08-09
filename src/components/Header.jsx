import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
      </nav>
      <hr />
    </header>
  );
}