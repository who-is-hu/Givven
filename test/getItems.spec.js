const assert = require('assert');
const app = require('../app');

const {Item, User} = require('../models');
const itemService = require('../services').Item;
const item = {
    name : "item1",
    content : "content",
    price : 1000,
    stock : 100,
}

describe('get items', () => {
    let itemServiceInstance;
    it('get item service instance', ()=>{
        const fakeUserModel= {};
        itemServiceInstance = new itemService(Item, User);
        assert(itemServiceInstance, !undefined);
    });
    it('get items', async () => {
        //console.log(itemServiceInstance);
        const items = await itemServiceInstance.regiseter(item);
        console.log(items[0].dataValues);
    });
});
