
import React, { useEffect } from 'react';

export default function PhotoUploadHandler({ file, onDone }) {
  useEffect(() => {
   
    onDone(file);
    
  }, [file, onDone]);

  return null;
}
