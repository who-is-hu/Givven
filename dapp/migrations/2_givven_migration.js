var givven = artifacts.require("Givven");
module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  //let ownerAddress = web3.eth.accounts[1];
  _deployer.deploy(givven);
};
 