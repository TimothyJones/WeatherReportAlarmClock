const ftp = require('ftp-get');
const fs = require('fs');
const convert = require('xml-js');

const MELBOURNE_WEATHER_URL = 'ftp://ftp.bom.gov.au/anon/gen/fwo/IDV10450.xml';

const getWeatherForecast = () =>
  new Promise((resolve, reject) => {
    ftp.get(MELBOURNE_WEATHER_URL, 'melbourne.xml', function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
    .then(
      file => fs.readFileSync(file, { encoding: 'utf8' }),
      error => ({ error, text: 'Network error' })
    )
    .then(xml => (xml.error ? xml : JSON.parse(convert.xml2json(xml))));

module.exports.getWeatherForecast = getWeatherForecast;
