
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="home-container">
      <motion.h1
        className="home-title"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        Welcome to Indy Safety Hub
      </motion.h1>
      <p className="home-subtitle">
        Your local safety assistant. Get alerts, tips, or chat with our AI about neighborhood safety.
      </p>
      <div className="home-buttons">
        <Link to="/chatbot" className="btn-primary">Ask the Safety Bot</Link>
        <Link to="/alerts" className="btn-secondary">View Safety Alerts</Link>
      </div>
    </div>
  );
}
