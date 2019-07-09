const forecast = require('../connectors/weatherForecast');
const polly = require('../connectors/polly');
const forecastToSsml = require('./ssmlGenerator');
const audioWrapper = require('./audioWrapper');

module.exports.weather = () =>
  forecast
    .getWeatherForecast()
    .then(data => polly(forecastToSsml(data)))
    .then(data => audioWrapper.wrap(data));
