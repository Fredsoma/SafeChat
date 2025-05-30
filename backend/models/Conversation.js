
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userMessage: String,
  botMessage: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversation', conversationSchema);
