const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  date: { type: Date, default: Date.now },
  temperature: { type: Number, required: true },
  feelsLike: { type: Number, required: true },
  condition: { type: String, required: true },
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
