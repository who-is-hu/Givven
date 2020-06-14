var express = require('express');
const router = express.Router();
const { isLoggedIn, isUserSeller } = require('./middlewares');

const Container = new (require('../utils/Container.js'));

router.post('/buy', isLoggedIn, async (req, res, next) => {
    const { value } = req.body;
    try{
        const tradeService = Container.get('tradeService');
        const result = await tradeService.buyPoint(req.user, parseInt(value));
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/change', isUserSeller, async (req, res, next) => {
    const { value } = req.body;
    try{
        const tradeService = Container.get('tradeService');
        const result = await tradeService.changePoint(req.user, parseInt(value));
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;