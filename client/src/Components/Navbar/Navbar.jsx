import React from 'react';
import { NavLink } from 'react-router-dom';

// styles
import './Navbar.css';

export default function Navbar() {
  return (
    <div className="Navbar">
      <NavLink activeClassName="Navbar-active" to="/">
        Home
      </NavLink>
      <NavLink activeClassName="Navbar-active" to="/register">
        Register
      </NavLink>
      <NavLink activeClassName="Navbar-active" to="/soda">
        Soda
      </NavLink>
      <NavLink activeClassName="Navbar-active" to="/movies">
        movies
      </NavLink>
    </div>
  );
}
