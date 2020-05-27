const assert = require('assert');
const app = require('../app');

const models = require('../models');
const Trade = require('../services/trade');


describe('buy point', () => {
    let trade;
    it('get trade service instance', ()=>{
        trade = new Trade(models);
        assert(trade, !undefined);
    });
    it('buy point', async () => {
        let usermock = {
            id : 1,
            point : 100,
        };
        const itemId = 1;
        const ordercount = 3;
        const campaignId = 1;
        const result = await trade.buyItem(usermock, itemId, ordercount, campaignId);
        assert(result.success, true );
    });
});
