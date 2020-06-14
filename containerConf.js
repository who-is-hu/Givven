const Container = new (require('./utils/Container.js'));
const Model = require('./models');
const services = require('./services');
var Web3 = require('web3');
const ContractCaller = require('./dapp/src/ContractCaller');

const contractaddress = '0x53a3AB101001a5f9b4773F029B93e0Cab50EA3c3';
var provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:8545')
var web3 = new Web3(provider);

const ContainerConf = () => {
    Container.register('contractCaller', [], async () => {
        const contarctCaller = new ContractCaller('./dapp/build/contracts/Givven.json');
        contarctCaller.setProvider(provider);
        contarctCaller.setweb3(web3);
        contarctCaller.setContract(contractaddress);
        const accounts = await web3.eth.getAccounts();
        contarctCaller.setAccount(accounts[0]);
        return contarctCaller;
    });
    Container.register('userModel', [], () => {
        return Model.User;
    });
    Container.register('campaignModel', [], () => {
        return Model.Campaign;
    });
    Container.register('itemModel', [], () => {
        return Model.Item;
    });
    Container.register('orderModel', [], () => {
        return Model.Order;
    });
    Container.register('donationModel', [], () => {
        return Model.Donation;
    });
    Container.register('allModels', [], () => {
        return Model;
    });
    Container.register('campaignService', [
        'campaignModel', 'userModel'
    ], (campaignModel, userModel) => {
        return new services.Campaign(campaignModel, userModel);
    });
    Container.register('itemService', [
        'itemModel', 'userModel'
    ], (itemModel, userModel) => {
        return new services.Item(itemModel, userModel);
    });
    Container.register('tradeService', ['allModels'], (allModels) => {
        return new services.Trade(allModels);
    });
    Container.register('tradeLogs', ['allModels'], (allModels) => {
        return new services.TradeLog(allModels);
    });
   
}
module.exports = ContainerConf;