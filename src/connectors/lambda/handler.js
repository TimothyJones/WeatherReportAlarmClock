const weather = require('../domain');
const { marshal } = require('./marshal');

module.exports.handler = async event => {
  return weather().then(marshal);
};
