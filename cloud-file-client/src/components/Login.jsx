import React, { useState } from 'react';
import ModalForm from './ModalForm';
import '../../blocks/Login.css';

function Login({ onLogin, onSwitchToSignup, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await onLogin(email, password);
      onClose();
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <ModalForm title="Login" onClose={onClose} onSubmit={handleSubmit} formClassName="login-form">
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
      {error && <p className="form-error">{error}</p>}
      <p className="switch-link">or <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup(); }}>Signup</a></p>
    </ModalForm>
  );
}

export default Login;