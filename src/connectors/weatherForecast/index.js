const ftp = require('ftp-get');
const fs = require('fs');
const xml2json = require('xml-js');
const convertForecast = require('./converter');

const MELBOURNE_WEATHER_URL = 'ftp://ftp.bom.gov.au/anon/gen/fwo/IDV10450.xml';

const process = (inp, fn) => (inp.error ? inp : fn(inp));
const makeError = (error, text) => ({ error, text });

const getWeatherForecast = () =>
  new Promise((resolve, reject) => {
    ftp.get(MELBOURNE_WEATHER_URL, 'melbourne.xml', (err, res) =>
      err ? reject(err) : resolve(res)
    );
  })
    .catch(error => makeError(error, 'Network error'))
    .then(file => process(file, f => fs.readFileSync(f, { encoding: 'utf8' })))
    .catch(error => makeError(error, 'Unable to read file'))
    .then(xml => process(xml, x => JSON.parse(xml2json.xml2json(x))))
    .catch(error => makeError(error, 'Unable to parse file'))
    .then(x => process(x, convertForecast))
    .catch(error => makeError(error, 'Forecast in unexpected structure'));

module.exports.getWeatherForecast = getWeatherForecast;
