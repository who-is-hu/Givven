import path from 'path';
const fs = require('fs');

var Web3 = require("web3");
const contractaddress = "0x3a210ba43667be2c579aba12decb6bba9f678346";
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

fs.readFile('../build/Givven.json','utf8',(error,jsonFile)=>{
    if(error) return console.log(error);
    const jsonData = JSON.parse(jsonFile);
    const abi = jsonData.abi;
    console.log(abi);
})
var Givven = web3.eth.contract()
