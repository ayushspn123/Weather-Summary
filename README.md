# Weather-Summary
# Real-Time Weather Monitoring System

## Overview
This application retrieves real-time weather data from the OpenWeatherMap API and processes it to provide daily summaries. It calculates aggregates, monitors threshold alerts, and visualizes historical weather trends.

## Tech Stack
- **Frontend**: React (UI for displaying weather data)
- **Backend**: Node.js, Express (API and server)
- **Database**: MongoDB (stores weather data summaries)
- **Testing**: Jest
- **External Service**: OpenWeatherMap API

## Prerequisites
- Node.js >= 14.x
- MongoDB
- OpenWeatherMap API Key

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd weather-monitoring
npm install
MONGODB_URI=<your-mongodb-uri>
PORT=4000
OWM_API_KEY=<your-openweathermap-api-key>
FETCH_INTERVAL=5
