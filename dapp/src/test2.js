var Web3 = require('web3');
var decoder = require('abi-decoder');
var blockchain = require('./GivvenRepository.js');

const contractaddress = '0xcCEd1CfA48c2a1d848756A9FA4A3Dd91Ae7F3FE1';
const hash = '0x4d3d8b08f67251638a6e05db2642ed2aef596be0ed156cbaa359ede7e731886d';

var provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:8545')
var web3 = new Web3(provider);

var gr = new blockchain();
gr.setProvider(provider);
gr.setweb3(web3);
gr.setAbi();
gr.setContract(contractaddress);

async function start(){
    let res;
    // res = await gr.addUser('jin');
    // console.log(res);
    // res = await gr.getUserBalance('jin');
    // console.log(res);
    //  res = await gr.chargerUser('jin',5);
    //  console.log(res);
    // res = await gr.getUserBalance('jin');
    // console.log(res);

    // res = await gr.createCampaign('1','camp1');
    // console.log(res);
    // res = await gr.donate('jin','1',5);
    // console.log(res);
    // res = await gr.getCampaignBalance('1');
    // console.log(res);
}
async function getaccount(){
    const accounts = await web3.eth.getAccounts();
    gr.setAccount(accounts[0]);
    start();
};
getaccount();

//Interact with smart contract