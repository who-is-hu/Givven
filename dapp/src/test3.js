const ContractCaller = require('./ContractCaller.js');
const  contractaddress = '0x8f4Bb8f3E6e0CD5e6F0E29200985744237839FE5';
var cc = new ContractCaller('../build/contracts/Givven.json');

async function start(){
    let res;
    res = await cc.addUser('jin');
    console.log(res);
    res = await cc.getUserBalance('jin');

    res = await cc.chargeUser('jin',5);
    console.log(res);
    res = await cc.getUserBalance('jin');
    console.log(res);

    res = await cc.createCampaign('1','camp1');
    console.log(res);
    res = await cc.donate('jin','1',3);
    console.log(res);
   // let res2 = await cc.getTransactionData(res);
    res = await cc.getCampaignBalance('1');
    console.log(res);

    // console.log(res2);

    
}
async function getaccount(){
    const accounts = await cc.getweb3().eth.getAccounts();
    cc.setAccount(accounts[0]);
    cc.setContract(contractaddress);
    start();
};
getaccount();