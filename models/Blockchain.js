class Blockchain {
  constructor() {
    this.blocks = [];
  }

  addBlock(block) {
    this.blocks.push(block);
  } 

  getBlockHeight() {
    return this.blocks.length;
  }
}

module.exports = Blockchain;