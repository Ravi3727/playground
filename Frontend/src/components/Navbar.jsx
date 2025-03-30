import React from "react";
import "../styles/Navbar.css";
import gdgLogo from "../assets/ProjectPageIcons/gdg.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src={gdgLogo}
          alt="Logo"
          className="navbar-logo-img"
        />
        
      </div>
      <ul className="navbar-links">
        <li>Resources & Blogs</li>
        <li className="active">Projects</li>
        <li>Events</li>
        <li>Alumni</li>
      </ul>
      <button className="navbar-login">Log in</button>
    </nav>
  );
};

export default Navbar;