var express = require('express');
const router = express.Router();
const { isLoggedIn, isUserSeller, isUserCharity } = require('./middlewares');

const Container = new (require('../utils/Container.js'));

router.post('/register', isUserSeller, async (req, res, next) => {
    let item = { name , price, content, stock, title_img } = req.body;
    try{
        const itemServiceInstance = Container.get('itemService');
        let result = await itemServiceInstance.register(req.user, item);
        console.log(result);
        res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=None");
        return res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});