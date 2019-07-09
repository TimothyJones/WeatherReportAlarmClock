const forecast = require('./connectors/weatherForecast');
const polly = require('./connectors/polly');
const writeToS3 = require('./connectors/s3');
const forecastToSsml = require('./domain/ssmlGenerator');

module.exports.weather = () =>
  forecast
    .getWeatherForecast()
    .then(data => polly(forecastToSsml(data)))
    .then(data => writeToS3(data));
