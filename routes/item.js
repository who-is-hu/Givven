var express = require('express');
const router = express.Router();
const { isLoggedIn, isUserSeller } = require('./middlewares');

const CampaignService = require('../services/campaign');

router.post('/register', isLoggedIn, isUserSeller, async (req, res, next) => {
    const item = { name , price, content, stock, owner} = req.body;
    try{
        const campaignServiceInstance = new CampaignService(req.user);
        let result = await campaignServiceInstance.register(campaign);
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;