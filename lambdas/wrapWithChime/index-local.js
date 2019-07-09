const fs = require('fs');
const EventEmitter = require('events');
const { weather } = require('./src');

const eventEmitter = new EventEmitter();
const key = 'audio/latest-forecast.mp3';
const bucket = 'tims-notifications';

weather({ key, bucket })
  .then(data => {
    console.log(data.length);
    fs.writeFileSync('/tmp/weather.mp3', data);
    eventEmitter.emit('done', null);
  })
  .catch(e => {
    eventEmitter.emit('done', e);
  });

eventEmitter.on('done', e => {
  if (e) {
    process.stderr.write(JSON.stringify(e));
  }
});
