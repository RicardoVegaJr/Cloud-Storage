import React, { useState } from 'react';
import ModalForm from './ModalForm';
import '../../blocks/Login.css';

function Login({ onLogin, onSwitchToSignup, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here, e.g., call onLogin(username, password)
    onLogin(username, password);
  };

  return (
    <ModalForm title="Login" onClose={onClose} onSubmit={handleSubmit} formClassName="login-form">
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
      <button type="submit" className="login-button">Login</button>
      <p className="switch-link">or <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup(); }}>Signup</a></p>
    </ModalForm>
  );
}

export default Login;