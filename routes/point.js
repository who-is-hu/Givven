var express = require('express');
const router = express.Router();
const { isLoggedIn, isUserSeller } = require('./middlewares');

const Container = new (require('../utils/Container.js'))();

router.post('/buy', isLoggedIn, async (req, res, next) => {
  const { value } = req.body;
  try {
    const tradeService = Container.get('tradeService');
    const result = await tradeService.buyPoint(req.user, parseInt(value));
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/change', isUserSeller, async (req, res, next) => {
  const { value } = req.body;
  try {
    const tradeService = Container.get('tradeService');
    const result = await tradeService.changePoint(req.user, parseInt(value));
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    //const tradeService = Container.get('tradeService');
    res.status(200).json(req.user.point);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
