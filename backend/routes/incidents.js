
const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');

// GET /api/incidents
router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.json(incidents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
});

// POST /api/incidents
router.post('/', async (req, res) => {
  const { title, description, location } = req.body;
  if (
    !title ||
    !location ||
    typeof location.lat !== 'number' ||
    typeof location.lng !== 'number'
  ) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }
  try {
    const newIncident = new Incident({ title, description, location });
    await newIncident.save();
    res.status(201).json(newIncident);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create incident' });
  }
});

module.exports = router;
