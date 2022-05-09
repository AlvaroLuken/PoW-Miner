const secp = require('@noble/secp256k1');
const { keccak_256 } = require('@noble/hashes/sha3');
const { bytesToHex } = require('@noble/hashes/utils');

// private keys (use )
let privateKey1 = secp.utils.randomPrivateKey();
privateKey1 = Buffer.from(privateKey1).toString('hex');

// public keys
let publicKey1 = secp.getPublicKey(privateKey1);
publicKey1 = bytesToHex(keccak_256(publicKey1.slice(1)));
publicKey1 = "0x" + publicKey1.slice(-40);

console.log("Pub Key: " + publicKey1);
console.log("Private Key: " + privateKey1);
