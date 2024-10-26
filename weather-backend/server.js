const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const weatherRoutes = require('./routes/Weather');
const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = 'mongodb://localhost:27017/'; 
// Middleware
app.use(cors());
app.use(express.json());
app.use('/weather', weatherRoutes);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('MongoDB connection error:', error));



