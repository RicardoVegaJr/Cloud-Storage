import "../../blocks/Main.css";
import MainWallpaper from "../assets/HomeWallpaper.jpg";
import Login from "./Login";
import Signup from "./Signup";
import Footer from "./Footer";
import Header from "./Header";
import React, { useState } from "react";

function Main({ onLogin
}) {
  const [form, setForm] = useState('login');
  const [showModal, setShowModal] = useState(true);


  const onSwitchToSignup = () => {
    setForm(form === 'login' ? 'signup' : 'login');
  };


  return (
    <>
      <Header />
      <main className="main-page">
      <div className="main-page__image-wrapper">
        <img
          src={MainWallpaper}
          className="main-page__image"
          alt="Main Wallpaper"
        />
      </div>
       <div className={`form-wrapper ${form === 'login' ? 'show-login' : 'show-signup'}`}>
         <div className="login-section">
           <Login onLogin={onLogin} onSwitchToSignup={onSwitchToSignup} />
         </div>
         <div className="signup-section">
           <Signup onSwitchToSignup={onSwitchToSignup}/>
         </div>
       </div>
       {showModal && (
         <div className="info-modal">
           <button className="close-button" onClick={() => setShowModal(false)}>&times;</button>
           <h2>Cloud Storage Web App</h2>
           <p>Our cloud storage web app offers a comprehensive solution for managing your files securely and efficiently. Key capabilities include:</p>
           <ul>
           <li><strong>Secure File Storage:</strong> Store your files in the cloud with advanced encryption to ensure data privacy and protection.</li>
           <li><strong>Easy Upload and Download:</strong> Seamlessly upload files from your device and download them anytime, anywhere.</li>
           <li><strong>File Organization:</strong> Create folders, organize files, and use search functionality to find what you need quickly.</li>
           <li><strong>Cross-Device Access:</strong> Access your files from any device with an internet connection, including desktops, laptops, tablets, and smartphones.</li>
           <li><strong>Collaboration Features:</strong> Share files and folders with others, set permissions, and collaborate in real-time.</li>
           <li><strong>Backup and Sync:</strong> Automatic backup of your files and synchronization across all your devices.</li>
           <li><strong>Version Control:</strong> Keep track of file versions and restore previous versions if needed.</li>
           <li><strong>High Performance:</strong> Fast upload and download speeds with reliable uptime.</li>
         </ul>
         <p className="summary">Experience secure cloud storage with file organization, cross-device access, collaboration tools, automatic backup, version control, and high-performance operations for all your file management needs.</p>
         </div>
       )}
       <Footer />
    </main>
    </>
  );
}

export default Main;