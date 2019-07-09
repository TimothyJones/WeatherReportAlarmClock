const lambdaAudio = require('lambda-audio');
const fs = require('fs');
const waitOn = require('wait-on');

const START = './audio/wakeup-start.mp3';
const END = './audio/silence.mp3';

const SAMPLED_SPEECH = '/tmp/up-forecast.mp3';
const ORIGINAL_SPEECH = '/tmp/forecast.mp3';
const OUTPUT = '/tmp/output.mp3';

module.exports.wrap = data =>
  Promise.resolve(data)
    .then(data => {
      fs.writeFileSync(`${ORIGINAL_SPEECH}`, data.AudioStream);
      return lambdaAudio.sox(`${ORIGINAL_SPEECH} -r 44100 ${SAMPLED_SPEECH}`);
    })
    .then(() =>
      waitOn({ resources: [SAMPLED_SPEECH], delay: 100 }).then(
        lambdaAudio.sox(`${START} ${SAMPLED_SPEECH} ${END} ${OUTPUT}`)
      )
    )
    .then(() =>
      waitOn({ resources: [OUTPUT], delay: 100 }).then(() =>
        fs.readFileSync(OUTPUT, { encoding: null, flag: 'r' })
      )
    );
