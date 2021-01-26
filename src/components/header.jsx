import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark bg-gradient-dark shadow-sm">
      <div className="container d-flex flex-column flex-lg-row justify-content-between">
        {/* logo */}
        <Link to="/" className="navbar-brand page-scroll header-logo">
          <h3 className="app-name">
            Exercise Transcriptome Meta-analysis
          </h3>
        </Link>
        {/* navigation */}
        <div className="navbar-nav-scroll">
          <ul className="navbar-nav bd-navbar-nav flex-row">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${currentPath === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link ${
                  currentPath === '/about' ? 'active' : ''
                }`}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
