var express = require('express');
const router = express.Router();
const { isLoggedIn, wrapAsync } = require('./middlewares');

const Container = new (require('../utils/Container.js'))();
router.get(
  '/orderDetail/:orderId',
  wrapAsync(async (req, res, next) => {
    const tradeLogs = Container.get('tradeLogs');
    const order = await tradeLogs.getOrderDetail(req.params.orderId);
    return res.status(200).json(order);
  }),
);

router.get(
  '/myOrders',
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    const tradeLogs = Container.get('tradeLogs');
    const orders = await tradeLogs.getMyOrders(req.user);
    return res.status(200).json(orders);
  }),
);

router.get(
  '/ordersByCampaign/:campaignId',
  wrapAsync(async (req, res, next) => {
    const tradeLogs = Container.get('tradeLogs');
    const order = await tradeLogs.getOrdersByCampaign(req.params.campaignId);
    return res.status(200).json(order);
  }),
);

router.get(
  '/myDonations/:option',
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    const tradeLogs = Container.get('tradeLogs');
    const orders = await tradeLogs.getMyDonations(req.user, req.params.option);
    return res.status(200).json(orders);
  }),
);

router.get(
  '/donationsByCampaign/:campaignId',
  wrapAsync(async (req, res, next) => {
    const tradeLogs = Container.get('tradeLogs');
    const donations = await tradeLogs.getDonationsByCampaign(
      req.params.campaignId,
    );
    return res.status(200).json(donations);
  }),
);

module.exports = router;
