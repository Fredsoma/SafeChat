
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incidentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Incident', incidentSchema);
