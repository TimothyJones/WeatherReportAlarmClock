const s3connector = require('./connectors/s3');
const chimes = require('./domain/chimes');

module.exports.wrapFile = ({ bucket, key }) => {
  const s3 = s3connector({ bucket, key });
  return s3
    .getObject(key)
    .then(chimes.wrap)
    .then(s3.putObject);
};
