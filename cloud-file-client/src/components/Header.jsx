import '../../blocks/Header.css';
import { useState } from 'react';

export default function Header({ onLoginClick, onSignupClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    onLoginClick();
    setIsMenuOpen(false);
  };

  const handleSignupClick = () => {
    onSignupClick();
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <h1 className="header-title">Cloud File Client</h1>
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
      </button>
      {isMenuOpen && (
        <nav className="menu">
          <ul className="menu-list">
            <li><button className="menu-item" onClick={handleLoginClick}>Login</button></li>
            <li><button className="menu-item" onClick={handleSignupClick}>Signup</button></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
