
const express = require('express');
const router = express.Router();
const tipsData = require('../data/tips.json');

// GET /api/tips 
router.get('/', (req, res) => {
  res.json(tipsData);
});

module.exports = router;
