const forecast = require('./connectors/weatherForecast');

forecast.getWeatherForecast().then(forecast => console.log(forecast));
