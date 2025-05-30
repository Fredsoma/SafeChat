
import React from 'react';
import './Modal.css';

export default function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </header>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
