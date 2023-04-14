import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../img/logo.jpg";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-logo">
          <NavLink exact to="/" className="navbar-brand">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <ul className="navbar-links mx-auto">
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/cart" activeClassName="active">
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/login" activeClassName="active">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
