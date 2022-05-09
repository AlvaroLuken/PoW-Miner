const Blockchain = require('./models/Blockchain');
const Block = require('./models/Block');
const jayson = require('jayson');
const { startMining, stopMining } = require('./mine');
const { PORT } = require('./config');
const { utxos } = require('./db');

// create a server
const server = new jayson.Server({
  startMining: function(_, callback) {
    callback(null, 'success!');
    startMining();
  },

  stopMining: function(_, callback) {
    stopMining();
    callback(null, 'success!');
  },

  getBalance: function([address], callback) {
    const relevantUTXOS = utxos.filter(x => {
      return x.owner === address && !x.spent
    });
    const sum = relevantUTXOS.reduce((p, c) => p + c.amount, 0);
    callback(null, sum);
  }
});

server.http().listen(PORT);