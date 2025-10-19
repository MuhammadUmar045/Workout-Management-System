import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">MERN Stack</span>
        </div>
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`nav-link ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
