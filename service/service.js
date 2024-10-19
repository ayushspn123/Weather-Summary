const axios = require('axios');
const Weather = require('../models/models');
const { OPENWEATHER_API_KEY, TEMP_THRESHOLD, POLL_INTERVAL } = require('../config');

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const maxRecordsPerDay = 5; // Limit for records per day

const fetchWeatherData = async () => {
    try {
        for (const city of cities) {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`);
                const { main, weather } = response.data;
                const record = {
                    averageTemp: main.temp,
                    maxTemp: main.temp_max,
                    minTemp: main.temp_min,
                    dominantCondition: weather[0].main,
                    alerts: []
                };

                if (record.averageTemp > TEMP_THRESHOLD) {
                    record.alerts.push(`Temperature exceeded threshold! Current: ${record.averageTemp}°C`);
                }

                const today = new Date();
                const dateStr = today.toISOString().split('T')[0]; 

                await Weather.updateOne(
                    { date: dateStr }, 
                    {
                        $push: {
                            records: record // Push the new record to the records array
                        }
                    },
                    { upsert: true } // Create if it doesn't exist
                );

                const weatherData = await Weather.findOne({ date: dateStr });
                if (weatherData && weatherData.records.length > maxRecordsPerDay) {
                    const updatedRecords = weatherData.records.slice(-maxRecordsPerDay);
                    await Weather.updateOne(
                        { date: dateStr },
                        { $set: { records: updatedRecords } } 
                    );
                }

                console.log(`Weather data for ${city} updated successfully.`);
            } catch (error) {
                console.error(`Error fetching weather data for ${city}: ${error.message}`);
            }
        }
    } catch (error) {
        console.error(`Error in fetching weather data: ${error.message}`);
    }
};

// Schedule fetching every `POLL_INTERVAL` minutes
setInterval(fetchWeatherData, POLL_INTERVAL * 60 * 1000);

module.exports = { fetchWeatherData };
