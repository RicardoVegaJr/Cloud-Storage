import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

if (import.meta.env && import.meta.env.VITE_API_BASE_URL) {
  window.__API_BASE_URL__ = import.meta.env.VITE_API_BASE_URL;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
