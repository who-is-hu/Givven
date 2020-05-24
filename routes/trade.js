var express = require('express');
const router = express.Router();
const { isLoggedIn, isUserCharity } = require('./middlewares');

const Container = new (require('../utils/Container.js'));

router.post('/buy/point', isLoggedIn, async (req, res, next) => {
    try{
        const tradeInstance = Container.get('tradeService');
        const result = await tradeInstance.buyPoint(req.user, campaign);
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;