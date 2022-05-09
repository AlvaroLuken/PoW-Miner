const jayson = require('jayson');
const { PORT } = require('../config');
const client = require('./client');

// invoke "startMining"
client.request('startMining', [], function(err, response) {
  if(err) throw err;
  console.log(response.result); // should return success!
});
