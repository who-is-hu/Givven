var express = require('express');
const router = express.Router();
const { isLoggedIn, isUserSeller, isUserCharity } = require('./middlewares');

const Container = new (require('../utils/Container.js'))();
router.get('/orderDetail/:orderId', async (req, res, next) => {
  try {
    const tradeLogs = Container.get('tradeLogs');
    const order = await tradeLogs.getOrderDetail(req.params.orderId);
    //console.log(orders);
    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/myOrders', isLoggedIn, async (req, res, next) => {
  try {
    const tradeLogs = Container.get('tradeLogs');
    const orders = await tradeLogs.getMyOrders(req.user);
    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/ordersByCampaign/:campaignId', async (req, res, next) => {
  try {
    const tradeLogs = Container.get('tradeLogs');
    const order = await tradeLogs.getOrdersByCampaign(req.params.campaignId);
    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/myDonations/:option', isLoggedIn, async (req, res, next) => {
  try {
    const tradeLogs = Container.get('tradeLogs');
    const orders = await tradeLogs.getMyDonations(req.user, req.params.option);
    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/donationsByCampaign/:campaignId', async (req, res, next) => {
  try {
    const tradeLogs = Container.get('tradeLogs');
    const donations = await tradeLogs.getDonationsByCampaign(
      req.params.campaignId,
    );
    return res.status(200).json(donations);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
