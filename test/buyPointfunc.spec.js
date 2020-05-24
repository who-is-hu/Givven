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
        //console.log(itemServiceInstance);
        let usermock = {
            id : 1,
            point : 100,
        };
        const inputPoint = 10000;
        const result = await trade.buyPoint(usermock, inputPoint);
        assert(result.msg, inputPoint );
    });
});
