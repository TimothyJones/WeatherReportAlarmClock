const { weather } = require('../../domain');
const { marshal } = require('./marshal');

module.exports.handler = async event => weather().then(marshal);
