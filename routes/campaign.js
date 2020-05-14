var express = require('express');
const router = express.Router();
const { isLoggedIn, isUserCharity } = require('./middlewares');

const CampaignService = require('../services/campaign');

router.post('/register', isLoggedIn, isUserCharity, async (req, res, next) => {
    const { campaign } = req.body;
    try{
        const campaignServiceInstance = new CampaignService(req.user);
        let result = campaignServiceInstance.register(campaign);

        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;