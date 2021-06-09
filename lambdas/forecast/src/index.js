const AWS = require('aws-sdk');

const forecast = require('./connectors/weatherForecast');
const textToSpeech = require('./connectors/polly');
const saveForecast = require('./connectors/s3');
const toSsml = require('./domain/ssmlGenerator');

const kms = new AWS.KMS();

const decrypt = encrypted =>
  new Promise((resolve, reject) =>
    kms.decrypt(
      {
        CiphertextBlob: Buffer.from(encrypted, 'base64'),
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Plaintext.toString());
        }
      }
    )
  );

const config = decrypt(process.env.AirQualityApiToken).then(param => {});

const getForecasts = () =>
  Promise.all([
    forecast.getWeatherForecast(),
    airQuality.getAirQualityForecast(),
  ]).then(arr => reduce((acc, item) => ({ ...acc, ...item }), {}));

module.exports.weather = async () =>
  getForecasts()
    .then(forecasts => textToSpeech(toSsml(forecasts)))
    .then(data => saveForecast(data));
