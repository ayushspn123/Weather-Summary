const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    records: [
        {
            averageTemp: { type: Number, required: true },
            maxTemp: { type: Number, required: true },
            minTemp: { type: Number, required: true },
            dominantCondition: { type: String, required: true },
            alerts: { type: [String], default: [] } // Store alerts for this record
        }
    ]
}, { timestamps: true });

const Weather = mongoose.model('Weather', WeatherSchema);

module.exports = Weather;
