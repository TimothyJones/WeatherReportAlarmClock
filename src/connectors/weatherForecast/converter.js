const moment = require('moment');

const forecastFor = (json, time) =>
  json.elements[0].elements[1].elements
    .filter(a => a.attributes.aac === 'VIC_PT042')[0]
    .elements.filter(
      a =>
        moment(a.attributes['start-time-utc']).isBefore(time) &&
        moment(a.attributes['end-time-utc']).isAfter(time)
    )[0].elements;

const textFromNode = node => (node && node[0] ? node[0].elements[0].text : undefined);

const select = (forecast, text) => textFromNode(forecast.filter(a => a.attributes.type === text));

const marshal = selectedForecast => ({
  text: select(selectedForecast, 'precis'),
  minTemp: select(selectedForecast, 'air_temperature_minimum'),
  maxTemp: select(selectedForecast, 'air_temperature_maximum'),
  rainChance: select(selectedForecast, 'probability_of_precipitation')
});

const convertForecast = json => marshal(forecastFor(json, moment()));

module.exports = convertForecast;
