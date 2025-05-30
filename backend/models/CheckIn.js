const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkInSchema = new Schema({
  userIdentifier: { type: String },       
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },               
  missed: { type: Boolean, default: false }
});

module.exports = mongoose.model('CheckIn', checkInSchema);
