import React, { useState } from 'react';
import ModalForm from './ModalForm';
import '../../blocks/Signup.css';

function Signup({ onSignup, onSwitchToSignup, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here, e.g., call onSignup(username, password, email)
    onSignup(username, password, email);
  };

  return (
    <ModalForm title="Signup" onClose={onClose} onSubmit={handleSubmit} formClassName="signup-form">
      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="signup-button">Signup</button>
      <p className="switch-link">or <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup(); }}>Login</a></p>
    </ModalForm>
  );
}

export default Signup;