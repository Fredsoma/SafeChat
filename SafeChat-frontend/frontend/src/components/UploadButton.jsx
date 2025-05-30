
import React, { useRef } from 'react';

export default function UploadButton({ onFileSelected }) {
  const fileInput = useRef();

  const handleSelect = () => {
    const file = fileInput.current.files[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*,video/*"
        ref={fileInput}
        style={{ display: 'none' }}
        onChange={handleSelect}
      />
      <button
        type="button"
        onClick={() => fileInput.current.click()}
        className="btn btn-secondary"
      >
        📎 Attach Photo
      </button>
    </div>
  );
}
