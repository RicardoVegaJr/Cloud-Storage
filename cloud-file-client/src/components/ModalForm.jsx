import React from 'react';
import '../../blocks/ModalForm.css';

function ModalForm({ title, onClose, onSubmit, children, formClassName = '' }) {
  return (
    <div className="modal-container">
      <form className={`modal-form ${formClassName}`} onSubmit={onSubmit}>
        <button 
          type="button"
          className="modal-close-button" 
          onClick={onClose} 
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="modal-title">{title}</h2>
        {children}
      </form>
    </div>
  );
}

export default ModalForm;
