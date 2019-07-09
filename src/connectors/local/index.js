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
    eventEmitter.emit('done', e);
  });

eventEmitter.on('done', e => {
  if (e) {
    process.stderr.write(JSON.stringify(e));
  }
});
