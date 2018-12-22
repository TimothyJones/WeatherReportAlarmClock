const forecast = require('../connectors/weatherForecast');
const forecastToText = require('./ssmlGenerator');

forecast.getWeatherForecast().then(data => console.log(forecastToText(data)));
