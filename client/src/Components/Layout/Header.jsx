import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../Layout/AuthOptions';

// styles
import './Header.css';
export default function Header() {
  return (
    <header id="header">
      <Link className="title" to="/">
        <h1 className="title">Movies App</h1>
      </Link>
      <AuthOptions />
    </header>
  );
}
