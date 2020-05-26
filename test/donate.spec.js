const assert = require('assert');
const app = require('../app');

const models = require('../models');
const Trade = require('../services/trade');


describe('donate', () => {
    let trade;
    it('get trade service instance', ()=>{
        trade = new Trade(models);
        assert(trade, !undefined);
    });
    it('buy point', async () => {
        //console.log(itemServiceInstance);
        let usermock = {
            id : 1,
        };
        let campaignMock = {
            id : 1,
            dest_money : 10000,
            current_money : 100,
        } 
        const value = 10000;
        const result = await trade.donate(usermock, campaignMock.id, value);
        assert(result.msg, true );
    });
});
