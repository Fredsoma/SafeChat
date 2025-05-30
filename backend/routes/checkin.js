const express = require('express');
const router = express.Router();
const CheckIn = require('../models/CheckIn');

// POST /api/checkin/start  
router.post('/start', async (req, res) => {
 
  try {
    const ci = new CheckIn();
    await ci.save();
    return res.status(201).json(ci);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to start check-in' });
  }
});

// POST /api/checkin/end  
router.post('/end', async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'Missing check-in ID' });
  try {
    const ci = await CheckIn.findById(id);
    if (!ci) return res.status(404).json({ error: 'Check-in not found' });
    ci.endedAt = new Date();
    await ci.save();
    return res.json(ci);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to end check-in' });
  }
});


router.get('/missed', async (req, res) => {
  try {
    const cutoff = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes ago
    
    const missed = await CheckIn.find({ startedAt: { $lt: cutoff }, endedAt: null });
   
    for (let ci of missed) {
      ci.missed = true;
      await ci.save();
    }
    res.json(missed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch missed check-ins' });
  }
});

module.exports = router;
