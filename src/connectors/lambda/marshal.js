module.exports.marshal = data => ({
  statusCode: 200,
  headers: { 'Content-Type': data.ContentType },
  body: data.AudioStream.toString('base64'),
  isBase64Encoded: true
});
