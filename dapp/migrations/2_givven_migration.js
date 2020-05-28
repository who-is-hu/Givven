var simpletest = artifacts.require("Simpletest");
module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(simpletest);
};
