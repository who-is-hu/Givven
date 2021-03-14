var express = require('express');
const router = express.Router();
const {
  isLoggedIn,
  isUserSeller,
  isUserCharity,
  wrapAsync,
} = require('./middlewares');

const Container = new (require('../utils/Container.js'))();

router.post(
  '/register',
  isUserSeller,
  wrapAsync(async (req, res, next) => {
    let item = ({ name, price, content, stock, title_img } = req.body);
    const itemServiceInstance = Container.get('itemService');
    let result = await itemServiceInstance.register(req.user, item);
    return res.status(200).json(result);
  }),
);

router.get(
  '/items',
  wrapAsync(async (req, res, next) => {
    const itemServiceInstance = Container.get('itemService');
    const items = await itemServiceInstance.getItemList();
    res.status(200).json(items);
  }),
);

router.get(
  '/myItems',
  isUserSeller,
  wrapAsync(async (req, res, next) => {
    const itemServiceInstance = Container.get('itemService');
    const items = await itemServiceInstance.getMyItems(req.user);
    res.status(200).json(items);
  }),
);

router.get(
  '/detail/:itemId',
  wrapAsync(async (req, res, next) => {
    const itemServiceInstance = Container.get('itemService');
    const item = await itemServiceInstance.getItem(req.params.itemId);
    return res.status(200).json(item);
  }),
);

router.post(
  '/buy',
  isUserCharity,
  wrapAsync(async (req, res, next) => {
    const { addr, itemId, orderCount, campaignId } = req.body;
    const tradeInstance = Container.get('tradeService');
    const result = await tradeInstance.buyItem(
      req.user,
      addr,
      itemId,
      parseInt(orderCount),
      campaignId,
    );
    res.status(200).json(result);
  }),
);

module.exports = router;
