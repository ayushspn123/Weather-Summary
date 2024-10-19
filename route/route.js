const express = require('express');
const router = express.Router();
const {
    getWeatherSummaries,
    getWeatherSummaryByDate,
    setTemperatureThreshold,
    getCurrentAlerts,
    getCurrentWeatherDataForCity
} = require('../controller');

router.get('/summaries', getWeatherSummaries);
router.get('/summary/:date', getWeatherSummaryByDate);
router.post('/threshold', setTemperatureThreshold);
router.get('/alerts', getCurrentAlerts);
router.get('/:city', getCurrentWeatherDataForCity);

module.exports = router;
