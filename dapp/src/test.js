var Web3 = require('web3');
var decoder = require('abi-decoder');
var blockchain = require('./GivvenRepository.js');

const contractaddress = '0x347c1c3D35B7ca85208F2A57864f3861CF40529d';
const hash = '0x4d3d8b08f67251638a6e05db2642ed2aef596be0ed156cbaa359ede7e731886d';

var provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:8545')
var web3 = new Web3(provider);

var gr = new blockchain();
gr.setProvider(provider);
gr.setweb3(web3);
gr.setAbi();
gr.setContract(contractaddress);
decoder.addABI(gr.getAbi());

web3.eth.getTransaction(hash,function(error,result){

    var rawdata = result.input;
    var data = decoder.decodeMethod(rawdata);
    console.log(data);
   // console.log(typeof(result));
})

//VIEW Transaction