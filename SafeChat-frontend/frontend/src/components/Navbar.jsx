import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [menuOpen]);

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        
        <div className="navbar-logo">SafeChat</div>

        {/* Desktop Navigation Links */}
        <nav className="navbar-menu desktop-only">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/chatbot" className="nav-link">Chatbot</Link>
          <Link to="/alerts" className="nav-link">Alerts</Link>
          <Link to="/contacts" className="nav-link">Contacts</Link>
          <Link to="/tips" className="nav-link">Tips</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/resources" className="nav-link">Resources</Link>
          <Link to="/map" className="nav-link">Map</Link>
          <Link to="/safety-check" className="nav-link">Safety Check</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </nav>

        {/* Hamburger Icon for Mobile / Tablet */}
        <div
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span className="bar bar1"></span>
          <span className="bar bar2"></span>
          <span className="bar bar3"></span>
        </div>
      </div>

      {/* Overlay (dark transparent background) */}
      <div
        className={`menu-overlay ${menuOpen ? 'visible' : ''}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Sliding Mobile Menu */}
      <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-header">
          <div className="navbar-logo-mobile">SafeChat</div>
          <button
            className="close-button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <ul className="mobile-links">
          <li><Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/chatbot" className="mobile-link" onClick={() => setMenuOpen(false)}>Chatbot</Link></li>
          <li><Link to="/alerts" className="mobile-link" onClick={() => setMenuOpen(false)}>Alerts</Link></li>
          <li><Link to="/contacts" className="mobile-link" onClick={() => setMenuOpen(false)}>Contacts</Link></li>
          <li><Link to="/tips" className="mobile-link" onClick={() => setMenuOpen(false)}>Tips</Link></li>
          <li><Link to="/about" className="mobile-link" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" className="mobile-link" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          <li><Link to="/resources" className="mobile-link" onClick={() => setMenuOpen(false)}>Resources</Link></li>
          <li><Link to="/map" className="mobile-link" onClick={() => setMenuOpen(false)}>Map</Link></li>
          <li><Link to="/safety-check" className="mobile-link" onClick={() => setMenuOpen(false)}>Safety Check</Link></li>
          <li><Link to="/admin" className="mobile-link" onClick={() => setMenuOpen(false)}>Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
}
