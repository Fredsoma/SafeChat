import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Alerts.css';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/alerts') 
      .then(res => setAlerts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Helper: safely format an ISO timestamp; returns “Invalid Date” if parsing fails
  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return isNaN(date.getTime())
      ? 'Invalid date'
      : date.toLocaleString([], {
          dateStyle: 'medium',
          timeStyle: 'short'
        });
  };

  return (
    <div className="alerts-container">
      <h2>Local Safety Alerts</h2>
      <div className="alerts-grid">
        {alerts.map(alert => (
          <div key={alert.id} className="alert-card">
            <h3 className="alert-title">{alert.title}</h3>
            <p className="alert-desc">{alert.description}</p>
            <p className="alert-time">{formatTimestamp(alert.timestamp)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
