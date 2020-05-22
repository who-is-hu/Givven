var express = require('express');
const router = express.Router();
const { isLoggedIn, isUserSeller } = require('./middlewares');

const Container = new (require('../Container'));

router.post('/register', isLoggedIn, isUserSeller, async (req, res, next) => {
    const item = { name , price, content, stock, owner, title_img } = req.body;
    try{
        const itemServiceInstance = Container.get('itemService');
        let result = await itemServiceInstance.register(req.user, item);
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;