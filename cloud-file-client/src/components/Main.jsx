import "../../blocks/Main.css";
import MainWallpaper from "../assets/HomeWallpaper.jpg";
import Login from "./Login";
import Signup from "./Signup";
import React, { useState } from "react";

function Main({ onLogin
}) {
  const [form, setForm] = useState('');


  const onSwitchToSignup = () => {
    setForm(form === 'login' ? 'signup' : 'login');
  };


  return (
    <main className="main-page">
      <div className="main-page__image-wrapper">
        <img
          src={MainWallpaper}
          className="main-page__image"
          alt="Main Wallpaper"
        />
      </div>
       <h1 className="main_title">Cloud File Storage</h1>
       {form === 'login' ? (
        <Login onLogin={onLogin} onSwitchToSignup={onSwitchToSignup} />
      ) : (
        <Signup onSwitchToSignup={onSwitchToSignup}/>
      )}
    </main>
  );
}

export default Main;