var express = require('express');
const router = express.Router();
const { isLoggedIn, isUserCharity } = require('./middlewares');

const CampaignService = require('../services/campaign');

router.post('/register', isLoggedIn, isUserCharity, async (req, res, next) => {
    const campaign = { name , dest_money, content, due_day} = req.body;
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

router.get('/myCampaigns/:option', isLoggedIn, isUserCharity, async (req, res, next)=> {
    const campaignServiceInstance = new CampaignService(req.user);
    try{
        const campaigns = await campaignServiceInstance.getMyCampaigns(req.params.option);
        return res.json({
            data : {
                campaigns,
            }
        });
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/endCampaigns', isLoggedIn, isUserCharity, async (req, res, next) => {
    const campaignServiceInstance = new CampaignService(req.user);
    try{
        const endCampaigns = await campaignServiceInstance.getEndCampaigns();
        return res.json({
            data : {
                campaigns : endCampaigns,
            }
        });
    }catch(err)
    {
        console.error(err);
        next(err);
    }
});
module.exports = router;