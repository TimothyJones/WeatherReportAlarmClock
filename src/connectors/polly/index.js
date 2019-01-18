const AWS = require('aws-sdk');

const synthesiseSsml = ssml =>
  new Promise((resolve, reject) => {
    console.log(ssml);
    new AWS.Polly().synthesizeSpeech(
      {
        OutputFormat: 'mp3',
        SampleRate: '8000',
        Text: ssml,
        TextType: 'ssml',
        VoiceId: 'Amy',
        LanguageCode: 'en-GB'
      },
      (err, data) => {
        if (err) {
          // an error occurred
          console.log(err, err.stack);
          reject(err);
        }
        // successful response
        // fs.writeFileSync('weather.mp3, data.AudioStream);
        resolve(data);
      }
    );
  });

module.exports = synthesiseSsml;
