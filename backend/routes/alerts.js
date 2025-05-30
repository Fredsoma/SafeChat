const express = require('express');
const router = express.Router();
const alertsData = require('../data/alerts.json'); 


router.get('/', (req, res) => {
  res.json(alertsData);
});

module.exports = router;
