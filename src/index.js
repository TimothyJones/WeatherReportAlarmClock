const forecast = require('./connectors/weatherForecast');
const forecastToText = require('./domain/toText');

forecast.getWeatherForecast().then(data => console.log(forecastToText(data)));
