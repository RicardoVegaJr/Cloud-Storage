import "../../blocks/Main.css";
import MainWallpaper from "../assets/HomeWallpaper.jpg";
import Login from "./Login";
import Signup from "./Signup";
import Footer from "./Footer";
import Header from "./Header";
import React, { useState } from "react";

function Main({ onLogin, onSignup }) {
  const [form, setForm] = useState('login');
  const [showAuthModal, setShowAuthModal] = useState(false);


  const onSwitchToSignup = () => {
    setForm(form === 'login' ? 'signup' : 'login');
  };

  const handleLoginClick = () => {
    setForm('login');
    setShowAuthModal(true);
  };

  const handleSignupClick = () => {
    setForm('signup');
    setShowAuthModal(true);
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };


  return (
    <>
      <Header onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      <main className="main-page">
      <div className="main-page__image-wrapper">
        <img
          src={MainWallpaper}
          className="main-page__image"
          alt="Main Wallpaper"
        />
      </div>
       {showAuthModal && (
         <div className={`form-wrapper ${form === 'login' ? 'show-login' : 'show-signup'}`}>
           <div className="login-section">
             <Login onLogin={onLogin} onSwitchToSignup={onSwitchToSignup} onClose={handleCloseModal} />
           </div>
           <div className="signup-section">
             <Signup onSignup={onSignup} onSwitchToSignup={onSwitchToSignup} onClose={handleCloseModal} />
           </div>
         </div>
       )}
       <Footer />
    </main>
    </>
  );
}

export default Main;