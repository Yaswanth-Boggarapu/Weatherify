const express = require('express');
const nodemailer = require('nodemailer');
const Weather = require('../models/Weather');

const router = express.Router();

// MongoDB connection
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();
const MONGO_URI = 'mongodb://localhost:27017/'
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Route to save weather data
router.post('/weather', async (req, res) => {
  const { city, temperature, feelsLike, condition } = req.body;
  try {
    const weatherData = new Weather({ city, temperature, feelsLike, condition });
    await weatherData.save();
    res.status(201).send('Weather data saved successfully!');
  } catch (error) {
    res.status(500).send('Error saving weather data: ' + error.message);
  }
});

// Route to send email notifications
router.post('/send-email', async (req, res) => {
  const { message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'yaswanth7868@outlook.com',
      pass: 'Yaswanth123.',
    },
  });

  const mailOptions = await transporter.sendMail({ 
    from: 'yaswanth7868@outlook.com',
    to: 'yaswanth7868@gmail.com', 
    subject: 'Weather Alert',
    text: message,
  });

//   try {
//     await transporter.sendMail(mailOptions);
//     res.send('Email notification sent successfully!');
//   } catch (error) {
//     res.status(500).send('Error sending email: ' + error.message);
//   }
});

module.exports = router;
