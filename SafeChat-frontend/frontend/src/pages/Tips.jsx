
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tips.css';

export default function Tips() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/tips') 
      .then(res => setTips(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="tips-container">
      <h2>Safety Tips</h2>
      <ul className="tips-list">
        {tips.map(tip => (
          <li key={tip.id} className="tip-item">
            {tip.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
