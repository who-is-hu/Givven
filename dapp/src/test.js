const Web3 = require('web3');
const decoder = require('abi-decoder');
//var blockchain = require('./GivvenRepository.js');

const contractaddress = '0x347c1c3D35B7ca85208F2A57864f3861CF40529d';
const hash = '0x34681ac985ceaa222228440cb63bldf02d6dfad12f539a62a94071c8e678863f';
//var provider = new Web3.providers.HttpProvider('http:///www.ec2-15-164-245-218.ap-northeast-2.compute.amazonaws.com:8545')
var provider = new Web3.providers.WebsocketProvider('ws://ec2-15-164-245-218.ap-northeast-2.compute.amazonaws.com:8545')
var web3 = new Web3(provider);


async function getTransactionData(txHash){
    let data;
    web3.eth.getTransaction(txHash,function(error,result){
        console.log(result);
        var rawdata = result.input;
        data = decoder.decodeMethod(rawdata);
        console.log(data);
    })
};
getTransactionData(hash);
//VIEW Transaction