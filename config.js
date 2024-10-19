require('dotenv').config();

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    OPENWEATHER_API_KEY: process.env.API_KEY,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    TEMP_THRESHOLD: parseFloat(process.env.TEMP_THRESHOLD) || 35,
    POLL_INTERVAL: parseInt(process.env.POLL_INTERVAL) || 1 
};
