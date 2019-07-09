const { wrapFile } = require('./src');

module.exports.handler = async event => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  console.log(`Wrapping file ${key} in ${bucket}`);
  return wrapFile({ bucket, key });
};
