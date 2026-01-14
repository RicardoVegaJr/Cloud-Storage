import React from 'react';
import '../../blocks/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2026 Cloud File Storage. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;