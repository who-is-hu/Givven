var express = require('express');
const router = express.Router();
const { isLoggedIn, isUserSeller, wrapAsync } = require('./middlewares');

const Container = new (require('../utils/Container.js'))();

router.get(
  '/',
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    //const tradeService = Container.get('tradeService');
    res.status(200).json(req.user.point);
  }),
);

router.post(
  '/buy',
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    const { value } = req.body;
    const tradeService = Container.get('tradeService');
    const result = await tradeService.buyPoint(req.user, parseInt(value));
    res.status(200).json(result);
  }),
);

router.post(
  '/change',
  isUserSeller,
  wrapAsync(async (req, res, next) => {
    const { value } = req.body;
    const tradeService = Container.get('tradeService');
    const result = await tradeService.changePoint(req.user, parseInt(value));
    res.status(200).json(result);
  }),
);

module.exports = router;
