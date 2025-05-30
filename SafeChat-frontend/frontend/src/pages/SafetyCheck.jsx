import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SafetyCheck.css';

export default function SafetyCheck() {
  const [sessionId, setSessionId] = useState(null);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const CHECKIN_DURATION = 30 * 60; // 30 minutes in seconds

  // Start a new check-in session
  const startCheckIn = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/checkin/start');
      setSessionId(res.data._id);
      setTimer(CHECKIN_DURATION);

      // Start countdown
      const id = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(id);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
    } catch (err) {
      console.error(err);
      alert('Failed to start check-in. Try again.');
    }
  };

  // End (safe) check-in
  const endCheckIn = async () => {
    if (!sessionId) return;
    try {
      await axios.post('http://localhost:5000/api/checkin/end', { id: sessionId });
      clearInterval(intervalId);
      setSessionId(null);
      setTimer(0);
      alert('Glad you are safe!');
    } catch (err) {
      console.error(err);
      alert('Failed to end check-in.');
    }
  };

  // Format timer as mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="safetycheck-container">
      <h2>Safety Check-In</h2>
      {!sessionId ? (
        <button onClick={startCheckIn} className="start-btn">
          Start 30-Minute Check-In
        </button>
      ) : (
        <div className="timer-section">
          <p className="timer-text">Time Remaining: {formatTime(timer)}</p>
          <button onClick={endCheckIn} className="end-btn">
            I&#x27;m Safe
          </button>
        </div>
      )}
      {timer === 0 && sessionId && (
        <p className="missed-text">
          It appears your 30-minute check-in has expired. A “missed check-in” has been logged.
        </p>
      )}
    </div>
  );
}
