import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="Navbar">
      <NavLink activeClassName="Navbar-active" to="/">
        Home
      </NavLink>
      <NavLink activeClassName="Navbar-active" to="/register">
        Register
      </NavLink>
      <NavLink activeClassName="Navbar-active" to="/">
        Soda
      </NavLink>
      <NavLink activeClassName="Navbar-active" to="/sardines">
        Sardines
      </NavLink>
    </div>
  );
}
