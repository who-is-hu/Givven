const Web3 = require('web3');
const fs = require('fs');
var mnemonic = fs.readFileSync("../.secret").toString().trim();

const HDWalletProvider = require('@truffle/hdwallet-provider');

//var web3 = new Web3(new Web3.providers.WebsocketProvider(`wss://kovan.infura.io/ws/v3/9226d0db9a7945048c37d6d582e4598f`));
var web3 = new Web3(new HDWalletProvider(mnemonic, `wss://kovan.infura.io/ws/v3/9226d0db9a7945048c37d6d582e4598f`));
web3.eth.getAccounts().then(console.log);