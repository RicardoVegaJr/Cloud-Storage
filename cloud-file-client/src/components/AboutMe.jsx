import React from 'react';
import '../../blocks/AboutMe.css';

function AboutMe({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="aboutme-container">
      <div className="aboutme-modal">
        <button className="aboutme-close-button" onClick={onClose}>
          ×
        </button>
        
        <div className="aboutme-content">
          <div className="aboutme-image-placeholder">
            <img src="" alt="Author" className="aboutme-image" />
            <span className="image-placeholder-text">Photo Coming Soon</span>
          </div>
          
          <div className="aboutme-text">
            <h2>About Me</h2>
            <p>
              I am a multilingual full-stack developer with a strong background in Information Technology. 
              I build robust web applications using JavaScript, React, Node.js, and MongoDB. My projects 
              showcase my skills in integrating APIs and leveraging frameworks like GraphQL. My experience 
              as a team lead highlights my ability to solve technical problems and lead others.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
