import React, { useState } from 'react';
import ModalForm from './ModalForm';
import '../../blocks/Signup.css';

function Signup({ onSignup, onSwitchToSignup, onClose }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await onSignup(name, email, password);
      onClose();
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <ModalForm title="Signup" onClose={onClose} onSubmit={handleSubmit} formClassName="signup-form">
      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
      <button type="submit" className="signup-button">Signup</button>
      {error && <p className="form-error">{error}</p>}
      <p className="switch-link">or <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup(); }}>Login</a></p>
    </ModalForm>
  );
}

export default Signup;