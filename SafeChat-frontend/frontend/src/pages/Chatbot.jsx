
import React, { useState } from 'react';
import ChatMessage from '../components/ChatMessage';
import axios from 'axios';
import './Chatbot.css';

const EMERGENCY_KEYWORDS = [
  'fire', 'shooting', 'bleeding', 'knife', 'stab',
  'gun', 'domestic violence', '911', 'firefighter',
  'police', 'ambulance', 'heart attack'
];

function checkForEmergency(text) {
  return EMERGENCY_KEYWORDS.some(w => text.toLowerCase().includes(w));
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your Indy Safety Bot. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    // show user message
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');

    // triage emergencies
    if (checkForEmergency(text)) {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: '⚠️ It sounds like an emergency. Please call 911 immediately.' }
      ]);
      return;
    }

    // call your chat API
    try {
      const res = await axios.post('http://localhost:5000/api/chat', { message: text });
      setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
    } catch (err) {
      console.error('Chat API error:', err);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: 'Sorry, there was an error. Please try again later.'
      }]);
    }
  };

  return (
    <div className="chatbot-container">
      <h2>Chat with Safety Bot</h2>

      <div className="chat-window">
        {messages.map((msg, i) =>
          <ChatMessage key={i} sender={msg.sender} message={msg.text} />
        )}
      </div>

      <form onSubmit={handleSend} className="chat-form">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="chat-button">
          Send
        </button>
      </form>
    </div>
  );
}
