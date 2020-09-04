var Web3 = require('web3');
var givven = artifacts.require("Givven");

module.exports = function(_deployer) {
  
  // Use deployer to state migration tasks.
  _deployer.deploy(givven);

};
 