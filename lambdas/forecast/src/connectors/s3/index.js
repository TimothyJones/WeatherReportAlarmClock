const AWS = require('aws-sdk');

const writeToS3 = data =>
  new Promise((resolve, reject) => {
    const s3 = new AWS.S3();
    s3.putObject(
      {
        Body: data,
        Bucket: 'tims-notifications',
        Key: 'audio/latest-forecast.mp3',
        ContentType: 'audio/mpeg',
      },
      err => {
        if (err) {
          console.log(err, err.stack);
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });

module.exports = writeToS3;
