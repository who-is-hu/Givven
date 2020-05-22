const assert = require('assert');
const app = require('../app');

const itemModel = require('../models').Item;
const itemService = require('../services').Item;


describe('get items', () => {
    let itemServiceInstance;
    it('get item service instance', ()=>{
        const fakeUserModel= {};
        itemServiceInstance = new itemService(itemModel, fakeUserModel);
        assert(itemServiceInstance, !undefined);
    });
    it('get items', async () => {
        //console.log(itemServiceInstance);
        const items = await itemServiceInstance.getItemList();
        console.log(items[0].dataValues);
    });
});
