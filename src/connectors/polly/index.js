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
      // an error occurred
      if (err) console.log(err, err.stack);
      else {
        console.log(
          typeof data.AudioStream,
          data.AudioStream.name,
          data.AudioStream.constructor,
          data.AudioStream.constructor.name
        ); // successful response
        return data;
      }
      //fs.writeFileSync('weather.mp3', data.AudioStream);
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
