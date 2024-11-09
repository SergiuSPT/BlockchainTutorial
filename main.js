const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate("c0bc45167802a80b8f47eb0c7a8f2a7faaa7acdbcdd598898a51d13bd3f9d892");
const myWalletAddress = myKey.getPublic('hex');

let SerjCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "another public key", 10);
tx1.signTransaction(myKey);
SerjCoin.addTransaction(tx1);

console.log("\n Starting the miner...");
SerjCoin.minePendingTransactions(myWalletAddress);

console.log("\nBalance of Sergiu: ", SerjCoin.getBalanceOfAddress(myWalletAddress));

console.log("\n Starting the miner...");
SerjCoin.minePendingTransactions(myWalletAddress);

console.log("\nBalance of Sergiu: ", SerjCoin.getBalanceOfAddress(myWalletAddress));
