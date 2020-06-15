const fs = require('fs');
const Web3 = require('web3');
const blockchain = require('./ContractCaller.js');
var cc = new blockchain();
async function start(){
    let res;
    //res = await ccviewrgetTransactionData('0x52385b1fef43fd896c767538a2b7e3b224d8560883c8c4a9cee9a5318cc71212');
    // res = await cc.createCampaign('campaign1');
    // console.log(res);
    res = await cc.chargeUser('jin',5);
    console.log(res);
}
async function getaccount(){
    start();
};
getaccount();