const AWS = require('aws-sdk');
const fs = require('fs');

const synthesiseSsml = ssml => {
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
    function(err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
      fs.writeFileSync('weather.mp3', data.AudioStream);
      /*
  data = {
   AudioStream: <Binary String>, 
   ContentType: "audio/mpeg", 
   RequestCharacters: 37
  }
  */
    }
  );
};

module.exports = synthesiseSsml;
