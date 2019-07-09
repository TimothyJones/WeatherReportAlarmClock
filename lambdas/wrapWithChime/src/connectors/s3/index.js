const AWS = require('aws-sdk');

const s3connector = ({ key, bucket }) => ({
  getObject: () =>
    new Promise((resolve, reject) => {
      const s3 = new AWS.S3();
      s3.getObject(
        {
          Bucket: bucket,
          Key: key,
        },
        (err, data) => {
          if (err) {
            console.log(err, err.stack);
            reject(err);
          } else {
            resolve(data.Body);
          }
        }
      );
    }),

  putObject: data =>
    new Promise((resolve, reject) => {
      const s3 = new AWS.S3();
      s3.putObject(
        {
          Body: data,
          Bucket: bucket,
          Key: `withchimes/${key}`,
          ACL: 'public-read',
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
    }),
});

module.exports = s3connector;
