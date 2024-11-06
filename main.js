
const SHA256 = require("crypto-js/sha256");

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(dificulty){
        while(this.hash.substring(0, dificulty) !== Array(dificulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.dificulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block("02/11/2024", "genesis block","0");
    }

    getLastBlock(){
       return this.chain[this.chain.length-1];
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions)
        block.mineBlock(this.dificulty);

        console.log("Block successfully mined!");
        this.chain.push(block);

        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(let block in this.chain){
            for(let trans in this.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }else if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
    isChainValid(){
        for(let i = 1;i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let SerjCoin = new Blockchain();
SerjCoin.createTransaction(new Transaction("address1", "address2", 10));
SerjCoin.createTransaction(new Transaction("address3", "address4", 12));
SerjCoin.createTransaction(new Transaction("address5", "address6", 20));

console.log("\n Starting the miner...");
SerjCoin.minePendingTransactions("sergius-address");

console.log("\nBalance of Sergiu: ", SerjCoin.getBalanceOfAddress("sergius-address"));

console.log("\n Starting the miner again...");
SerjCoin.minePendingTransactions("sergius-address");

console.log("\nBalance of Sergiu: ", SerjCoin.getBalanceOfAddress("sergius-address"));
