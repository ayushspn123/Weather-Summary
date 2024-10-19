const request = require('supertest');
const express = require('express');
const { 
    getWeatherSummaries, 
    getWeatherSummaryByDate, 
    setTemperatureThreshold, 
    getCurrentWeatherDataForCity 
} = require('../controller');
const Weather = require('../models/models');

jest.mock('../models/models'); // Mock the Weather model
jest.mock('axios'); 

// Set up Express app for testing
const app = express();
app.use(express.json());
app.get('/weather', getWeatherSummaries);
app.get('/weather/:date', getWeatherSummaryByDate);
app.post('/weather/threshold', setTemperatureThreshold);
app.get('/weather/city/:city', getCurrentWeatherDataForCity);

describe('Weather Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

   
    
    test('should return a weather summary by date', async () => {
        const sampleDate = '2024-10-18';
        Weather.findOne.mockResolvedValue({ date: new Date(sampleDate), averageTemp: 25, maxTemp: 30, minTemp: 20 });
        const response = await request(app).get(`/weather/${sampleDate}`);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.date).toBeDefined();
        expect(response.body.message).toBe('Weather summary retrieved successfully.');
    });

    test('should set temperature threshold', async () => {
        const response = await request(app).post('/weather/threshold').send({ threshold: 30 });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toContain('Temperature threshold successfully set');
    });
    test('should set temperature threshold', async () => {
        const response = await request(app).post('/weather/threshold').send({ threshold: 30 });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toContain('Temperature threshold successfully set');
    });


    test('should fetch current weather data for a city', async () => {
        const axios = require('axios');
        axios.get.mockResolvedValue({ data: { main: { temp: 25 }, weather: [{ description: 'clear sky' }] } });

        const city = 'Mumbai';
        const response = await request(app).get(`/weather/city/${city}`);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.main.temp).toBe(25); // Check if the temperature matches
        expect(response.body.message).toBe('Current weather data retrieved successfully.');
    });
});
 
    
test('should return a weather summary by date', async () => {
    const sampleDate = '2024-10-18';
    Weather.findOne.mockResolvedValue({ date: new Date(sampleDate), averageTemp: 25, maxTemp: 30, minTemp: 20 });
    const response = await request(app).get(`/weather/${sampleDate}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.date).toBeDefined();
    expect(response.body.message).toBe('Weather summary retrieved successfully.');
});