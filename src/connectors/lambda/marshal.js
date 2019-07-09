module.exports.marshal = data => ({
  statusCode: 200,
  headers: { "Content-Type": "audio/mpeg" },
  body: data.toString("base64"),
  isBase64Encoded: true
});
