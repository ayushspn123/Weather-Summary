const Weather = require('./models/models');
const axios = require('axios');
const { OPENWEATHER_API_KEY } = process.env; // Ensure your API key is loaded from environment variables

const getWeatherSummaries = async (req, res) => {
    try {
        const summaries = await Weather.find().sort({ date: -1 }); // Fetch all summaries
        return res.status(200).json({
            success: true,
            data: summaries,
            message: 'Weather summaries retrieved successfully.'
        });
    } catch (error) {
        console.error('Error retrieving weather summaries:', error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving data. Please try again later.'
        });
    }
};

const getWeatherSummaryByDate = async (req, res) => {
    const { date } = req.params;
    try {
        const summary = await Weather.findOne({ date: new Date(date) });
        if (!summary) {
            return res.status(404).json({
                success: false,
                message: 'Summary not found for the provided date.'
            });
        }
        return res.status(200).json({
            success: true,
            data: summary,
            message: 'Weather summary retrieved successfully.'
        });
    } catch (error) {
        console.error('Error retrieving weather summary:', error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving summary. Please try again later.'
        });
    }
};

const setTemperatureThreshold = (req, res) => {
    const { threshold } = req.body;
    if (typeof threshold !== 'number') {
        return res.status(400).json({
            success: false,
            message: 'Invalid threshold value. Please provide a numeric value.'
        });
    }
    process.env.TEMP_THRESHOLD = threshold; // Update threshold in environment
    return res.status(200).json({
        success: true,
        message: `Temperature threshold successfully set to ${threshold}°C.`
    });
};

const getCurrentAlerts = async (req, res) => {
    try {
        const summaries = await Weather.find();
        const alerts = summaries.flatMap(summary => summary.alerts);
        return res.status(200).json({
            success: true,
            data: { alerts },
            message: 'Current alerts retrieved successfully.'
        });
    } catch (error) {
        console.error('Error retrieving alerts:', error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving alerts. Please try again later.'
        });
    }
};

const getCurrentWeatherDataForCity = async (req, res) => {
    const { city } = req.params;
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`);
        return res.status(200).json({
            success: true,
            data: response.data,
            message: 'Current weather data retrieved successfully.'
        });
    } catch (error) {
        console.error(`Error fetching weather data for city ${city}:`, error);
        return res.status(500).json({
            success: false,
            message: `Error fetching weather data for ${city}. Please try again later.`
        });
    }
};

module.exports = {
    getWeatherSummaries,
    getWeatherSummaryByDate,
    setTemperatureThreshold,
    getCurrentAlerts,
    getCurrentWeatherDataForCity
};
