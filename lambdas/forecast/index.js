const { weather } = require('./src');

module.exports.handler = async () => weather().catch(e => console.log(e));
