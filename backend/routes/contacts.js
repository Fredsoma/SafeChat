
const express = require('express');
const router = express.Router();
const contactsData = require('../data/contacts.json');


router.get('/', (req, res) => {
  res.json(contactsData);
});

module.exports = router;
