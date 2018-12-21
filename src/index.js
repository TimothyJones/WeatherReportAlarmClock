const forecast = require('./connectors/weatherForecast');

forecast.getWeatherForecast().then(tomorrow => console.log(tomorrow));
