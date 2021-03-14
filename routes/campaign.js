var express = require('express');
const router = express.Router();
const { isLoggedIn, isUserCharity, wrapAsync } = require('./middlewares');

const Container = new (require('../utils/Container.js'))();

router.post(
  '/register',
  isUserCharity,
  wrapAsync(async (req, res, next) => {
    const campaign = ({
      name,
      dest_money,
      content,
      due_day,
      title_img,
    } = req.body);
    const campaignServiceInstance = Container.get('campaignService');
    const result = await campaignServiceInstance.register(req.user, campaign);

    return res.statis(200).json(result);
  }),
);

router.get(
  '/myCampaigns/:option',
  isUserCharity,
  wrapAsync(async (req, res, next) => {
    const campaignServiceInstance = Container.get('campaignService');
    const campaigns = await campaignServiceInstance.getUserCampaigns(
      req.user,
      req.params.option,
    );
    return res.status(200).json(campaigns);
  }),
);

router.get(
  '/campaigns/:option',
  wrapAsync(async (req, res, next) => {
    const campaignServiceInstance = Container.get('campaignService');
    const campaigns = await campaignServiceInstance.getAllCampaigns(
      req.params.option,
    );
    return res.status(200).json(campaigns);
  }),
);

router.get(
  '/detail/:campaignId',
  wrapAsync(async (req, res, next) => {
    const campaignServiceInstance = Container.get('campaignService');
    const detail = await campaignServiceInstance.getCampaignDetail(
      req.params.campaignId,
    );
    return res.status(200).json(detail);
  }),
);

router.post(
  '/donate',
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    const { campaignId, value } = req.body;
    const tradeInstance = Container.get('tradeService');
    const result = await tradeInstance.donate(
      req.user,
      campaignId,
      parseInt(value),
    );
    return res.status(200).json(result);
  }),
);
module.exports = router;
