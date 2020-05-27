const Container = new (require('./utils/Container.js'));
const Model = require('./models');
const services = require('./services');

const ContainerConf = () => {
    Container.register('userModel', [], () => {
        return Model.User;
    });
    Container.register('campaignModel', [], () => {
        return Model.Campaign;
    });
    Container.register('itemModel', [], () => {
        return Model.Item;
    })
    Container.register('allModels', [], () => {
        return Model;
    });
    Container.register('campaignService', [
        'campaignModel','userModel'
    ], (campaignModel, userModel) => {
        return new services.Campaign(campaignModel, userModel);
    });
    Container.register('itemService', [
        'itemModel','userModel'
    ], (itemModel, userModel) => {
        return new services.Item(itemModel, userModel);
    });
    Container.register('tradeService', ['allModels'], (allModels) => {
        return new services.Trade(allModels);
    });
}
module.exports = ContainerConf;