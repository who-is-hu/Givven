const fs = require('fs');
var Web3 = require('web3');

const contractaddress = '0x9e510d2Da0F4263f564835e606668bDC0f4Cc05B';

//var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545/'));
var web3 = new Web3();
web3.setProvider('ws://127.0.0.1:8545');
console.log(web3.eth.Contract);


var jsonFile = fs.readFileSync('../build/contracts/Givven.json','utf8');
var jsonData = JSON.parse(jsonFile);
var abi = jsonData.abi;
//console.log(abi);
const givven = web3.eth.contract(abi).at(contractaddress);

const getBalance = async () => {
    try{
        const r =  await givven.getBalance('jin');
        return r;
    } catch (err) 
    {
        console.err(err);
    }

}
const t = getBalance();
console.log(t);