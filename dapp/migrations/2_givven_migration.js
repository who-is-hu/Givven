var Web3 = require('web3');
var givven = artifacts.require("Givven");
var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8545'));

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(givven);

};
 