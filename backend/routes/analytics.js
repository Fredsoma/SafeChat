const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');
const CheckIn = require('../models/CheckIn');

// GET /api/analytics
router.get('/', async (req, res) => {
  try {
    // 1. Incidents in last 7 days
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentIncidentsCount = await Incident.countDocuments({ createdAt: { $gte: oneWeekAgo } });

    // 2. Check-ins data: total started and total missed in last 7 days
    const checkIns = await CheckIn.find({ startedAt: { $gte: oneWeekAgo } });
    let totalStarted = checkIns.length;
    let totalMissed = 0;
    checkIns.forEach(ci => {
      if (ci.missed || (!ci.endedAt && new Date(ci.startedAt).getTime() < Date.now() - 30*60*1000)) {
        totalMissed++;
      }
    });

    // 3. a daily breakdown for chart (e.g., how many incidents each day)
    const dailyIncidents = {};
    for (let i = 0; i < 7; i++) {
      const day = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const key = day.toISOString().slice(0, 10); 
      dailyIncidents[key] = 0;
    }
    const allRecentIncidents = await Incident.find({ createdAt: { $gte: oneWeekAgo } });
    allRecentIncidents.forEach(inc => {
      const dayKey = inc.createdAt.toISOString().slice(0, 10);
      if (dayKey in dailyIncidents) dailyIncidents[dayKey]++;
    });

    res.json({
      recentIncidentsCount,
      totalStarted,
      totalMissed,
      dailyIncidents
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Analytics fetch failed' });
  }
});

module.exports = router;
