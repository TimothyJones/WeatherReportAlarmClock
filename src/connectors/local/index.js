const { weather } = require('../../domain');
const fs = require('fs');
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

weather()
  .then(data => {
    console.log(data.length);
    fs.writeFileSync('/tmp/weather.mp3', data);
    eventEmitter.emit('done', null);
  })
  .catch(e => {
    console.log(e);
    eventEmitter.emit('done', { error: e });
  });

eventEmitter.on('done', e => {
  // I needed the result to be written to stdout so that the calling process could get it
  process.stdout.write(JSON.stringify(e));
});
