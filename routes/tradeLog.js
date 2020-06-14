var express = require('express');
const router = express.Router();
const { isLoggedIn, isUserSeller, isUserCharity } = require('./middlewares');

const Container = new (require('../utils/Container.js'));
router.get('/orderDetail/:orderId', async (req, res, next) => {
    try{
        const tradeLogs = Container.get('tradeLogs');
        let order = await tradeLogs.getOrderDetail(req.params.orderId);
        //console.log(orders);
        return res.json({
            data : order
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});
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
router.get('/ordersByCampaign/:campaignId', async (req, res, next) => {
    try{
        const tradeLogs = Container.get('tradeLogs');
        let order = await tradeLogs.getOrdersByCampaign(req.params.campaignId);
        return res.json({
            data : order
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.get('/myDonations/:option', isLoggedIn, async (req, res, next) => {
    try{
        const tradeLogs = Container.get('tradeLogs');
        let orders = await tradeLogs.getMyDonations(req.user, req.params.option);
        //console.log(orders);
        return res.json({
            data : orders
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.get('/donationsByCampaign/:campaignId', async (req, res, next) => {
    try{
        const tradeLogs = Container.get('tradeLogs');
        let donations = await tradeLogs.getDonationsByCampaign(req.params.campaignId);
        //console.log(orders);
        return res.json({
            data : donations
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;