var express = require('express');
const router = express.Router();
const { isLoggedIn, isUserSeller, isUserCharity } = require('./middlewares');

const Container = new (require('../utils/Container.js'));

router.get('/myOrders', isLoggedIn, async (req, res, next) => {
    try{
        const tradeLogs = Container.get('tradeLogs');
        let orders = await tradeLogs.getMyOrders(req.user);
        console.log(orders);
        return res.json({
            data : orders
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;