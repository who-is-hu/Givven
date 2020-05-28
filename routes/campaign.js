var express = require('express');
const router = express.Router();
const { isLoggedIn, isUserCharity } = require('./middlewares');

const Container = new (require('../utils/Container.js'));

router.post('/register', isUserCharity, async (req, res, next) => {
    const campaign = { name , dest_money, content, due_day, title_img} = req.body;
    try{
        const campaignServiceInstance = Container.get('campaignService');
        const result = await campaignServiceInstance.register(req.user, campaign);
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/myCampaigns/:option', isUserCharity, async (req, res, next)=> {
    try{
        const campaignServiceInstance = Container.get('campaignService');
        const campaigns = await campaignServiceInstance.getUserCampaigns(req.user, req.params.option);
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

router.get('/campaigns/:option', isUserCharity, async (req, res, next) => {
    const campaignServiceInstance = Container.get('campaignService');
    try{
        const campaigns = await campaignServiceInstance.getAllCampaigns(req.params.option);
        return res.json({
            data : {
                campaigns,
            }
        });
    }catch(err)
    {
        console.error(err);
        next(err);
    }
});
router.get('/detail/:campaignId', async (req, res, next) => {
    try{
        const campaignServiceInstance = Container.get('campaignService');
        const detail = await campaignServiceInstance.getCampaignDetail(req.params.campaignId);
        return res.json({
            data : detail,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.post('/donate', isLoggedIn, async( req, res, next) => {
    const { campaignId, value } = req.body;
    try {
        const tradeInstance = Container.get('tradeService');
        const result = await tradeInstance.donate(req.user, campaignId, value);
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
module.exports = router;