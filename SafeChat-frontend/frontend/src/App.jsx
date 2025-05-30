
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import Alerts from './pages/Alerts';
import Contacts from './pages/Contacts';
import Tips from './pages/Tips';
import About from './pages/About';
import Contact from './pages/Contact';
import MapPage from './pages/MapPage';
import SafetyCheck from './pages/SafetyCheck';
import MentalHealth from './pages/MentalHealth';
import AdminDashboard from './pages/AdminDashboard';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<MentalHealth />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/safety-check" element={<SafetyCheck />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
