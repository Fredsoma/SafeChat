const express = require('express');
const router = express.Router();
const axios = require('axios');
const Conversation = require('../models/Conversation');

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    // 1) Call the free-ChatGPT API
    const response = await axios.get(
      'https://free-chatgpt-api.p.rapidapi.com/chat-completion-one',
      {
        params: { prompt: message },
        headers: {
          'x-rapidapi-key': '602ea67bedmsh5846ab7b344fa78p173e63jsn59c5123da8bb',
          'x-rapidapi-host': 'free-chatgpt-api.p.rapidapi.com',
        },
      }
    );

    // The API response has the reply here:
    const botReply = response.data.response;

    // 2) Save into MongoDB without overwriting the rest of your code
    await Conversation.create({
      userMessage: message,
      botMessage: botReply
      
    });

    // 3) Return the bot’s reply
    res.json({ reply: botReply });
  } catch (err) {
    console.error('Backend error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
