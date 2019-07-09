const moment = require('moment-timezone');

const forecastFor = (json, time) => {
  console.log(JSON.stringify(json.elements), time);
  const day = json.elements[0].elements
    .find(e => e.name === 'forecast')
    .elements.find(a => a.attributes.aac === 'VIC_PT042')
    .elements.filter(
      a =>
        moment(a.attributes['start-time-utc']).isBefore(time) &&
        moment(a.attributes['end-time-utc']).isAfter(time)
    );

  if (day && day[0]) return day[0].elements;
  return null;
};

const textFromNode = node =>
  node && node[0] ? node[0].elements[0].text : undefined;

const select = (forecast, text) =>
  textFromNode(forecast.filter(a => a.attributes.type === text));

const marshal = selectedForecast =>
  selectedForecast
    ? {
        text: select(selectedForecast, 'precis'),
        minTemp: select(selectedForecast, 'air_temperature_minimum'),
        maxTemp: select(selectedForecast, 'air_temperature_maximum'),
        rainChance: select(selectedForecast, 'probability_of_precipitation'),
      }
    : { error: 'No day selected', text: 'the selected day was missing.' };

const convertForecast = json => marshal(forecastFor(json, moment().utc()));

module.exports = convertForecast;
