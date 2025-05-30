
import React from 'react';
import { motion } from 'framer-motion';
import './ChatMessage.css';

export default function ChatMessage({ message, sender }) {
  const isUser = sender === 'user';
  const bubbleClass = isUser ? 'chat-bubble user-bubble' : 'chat-bubble bot-bubble';
  const containerClass = isUser ? 'chat-message user' : 'chat-message bot';

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      className={containerClass}
    >
      <div className={bubbleClass}>
        <p className="message-text">{message}</p>
      </div>
    </motion.div>
  );
}
