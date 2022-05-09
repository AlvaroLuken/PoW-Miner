const jayson = require('jayson');
const { PORT } = require('../config');
const client = require('./client');
const {argv} = require('yargs');
const { PUBLIC_KEY } = require('../config');

// invoke "getBalance"
client.request('getBalance', [PUBLIC_KEY], function(err, response) {
  if(err) throw err;
  console.log(response.result); // should return success!
});
