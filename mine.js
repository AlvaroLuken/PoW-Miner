const db = require('./db');
const Blockchain = require('./models/Blockchain');
const Block = require('./models/Block');
const TARGET_DIFFICULTY = BigInt("0x0000" + "F".repeat(60));
const Transaction = require('./models/Transaction');
const UTXO = require('./models/UTXO');
const { PUBLIC_KEY } = require('./config');
const BLOCK_REWARD = 10;


let minerOn = true;
mine();

function startMining() {
  minerOn = true;
  mine();
}

function stopMining() {
  minerOn = false;
}

function mine() {
  if(!minerOn) {
    return;
  }

  const block = new Block();

  // TODO: add transactions from the mempool

  const coinbaseUTXO = new UTXO(PUBLIC_KEY, BLOCK_REWARD);
  const coinbaseTX = new Transaction([], [coinbaseUTXO]);

  block.addTransaction(coinbaseTX);

  while(BigInt("0x" + block.hash()) >= TARGET_DIFFICULTY) {
    block.nonce++;
  }

  block.execute();

  db.blockchain.addBlock(block);

  console.log(`Just mined block #${db.blockchain.getBlockHeight()} with a hash of ${block.hash()} at nonce #${block.nonce}`);

  setTimeout(mine, 2500);
}

module.exports = {
  startMining,
  stopMining
};