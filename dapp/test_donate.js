const ContractCaller = require("./ContractCaller");

var bc = new ContractCaller();

var user = 'user1234';
var social = 'SocialOrg1234';
var campaign = 'Camp1234';

async function tt(){
    
    let temp = await bc.addUser(user);
    console.log('add User : ' + temp);

    temp = await bc.addUser(social);
    console.log('add social org : ' + temp);

    temp = await bc.chargeUser(user,100);
    console.log('charge user : ' + temp);
    
    temp = await bc.getUserBalance(user);
    console.log('user Bal : ' + temp);
    
    temp = await bc.createCampaign(campaign,social);
    console.log('create campaign : ' + temp);

    temp = await bc.donate(user,campaign,30);
    console.log('donate hash : ' + temp);

    temp = await bc.getUserBalance(user);
    console.log('user Bal : ' + temp);

    temp = await bc.getCampaignBalance(campaign);
    console.log('campagin Bal : ' + temp);
}
tt();