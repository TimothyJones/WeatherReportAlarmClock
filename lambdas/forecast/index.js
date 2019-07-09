const { weather } = require('./src/domain');

module.exports.handler = async () => weather();
