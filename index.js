const express = require('express');
const mongoose = require('mongoose');
const weatherRoutes = require('./route/route');
const { fetchWeatherData } = require('./service/service');
const { MONGODB_URI } = require('./config');
const cors = require('cors');
const app = express();

// Allow requests from all origins (you can specify specific origins instead)
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Initialize routes
app.use('/weather', weatherRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Start fetching weather data
fetchWeatherData();
