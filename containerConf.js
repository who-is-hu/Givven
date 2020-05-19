const Container = new (require('./Container'));
const Model = require('./models');
const services = require('./services');

const ContainerConf = () => {
    Container.register('userModel', [], () => {
        return Model.User;
    });
    Container.register('campaignModel', [], () => {
        return Model.Campaign;
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
}
module.exports = ContainerConf;