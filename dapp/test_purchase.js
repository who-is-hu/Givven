const ContractCaller = require("./ContractCaller");

var bc = new ContractCaller();

var user = 'user1234';
var social = 'SocialOrg1234';
var campaign = 'Camp1234';
var seller = 'Seller1234';
var product = 'Product1234';



async function tt(){

    temp = await bc.addUser(seller);
    console.log('add seller hash : ' + temp);
    
    console.log('----before purchase-----');
    temp = await bc.getUserBalance(seller);
    console.log('seller Bal : ' + temp);

    temp = await bc.getCampaignBalance(campaign);
    console.log('campagin Bal : ' + temp);

    temp = await bc.purchase(campaign,seller,product,5,3);
    console.log('purchase hash : ' + temp);
    
    console.log('----after purchase-----');
    temp = await bc.getUserBalance(seller);
    console.log('seller Bal : ' + temp);

    temp = await bc.getCampaignBalance(campaign);
    console.log('campagin Bal : ' + temp);

    temp = await bc.productNumByCampaign(campaign, product);
    console.log('purchased product num : ' + temp);
   
}
tt();