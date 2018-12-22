const forecast = require('../connectors/weatherForecast');
const polly = require('../connectors/polly');
const forecastToSsml = require('./ssmlGenerator');

forecast.getWeatherForecast().then(data => polly(forecastToSsml(data)));
