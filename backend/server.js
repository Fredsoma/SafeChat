
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 
require('dotenv').config();

const chatRouter = require('./routes/chat');
const alertsRouter = require('./routes/alerts');
const incidentsRouter = require('./routes/incidents');
const checkinRouter = require('./routes/checkin');
const analyticsRouter = require('./routes/analytics');
const contactsRouter = require('./routes/contacts');
const tipsRouter = require('./routes/tips');
const uploadRouter = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount your routers—each must export an Express router
app.use('/api/chat', chatRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/incidents', incidentsRouter);
app.use('/api/checkin', checkinRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/tips', tipsRouter);
app.use('/api/upload', uploadRouter);
// Serve the uploads folder statically:
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
