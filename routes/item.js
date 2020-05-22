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

//Todo: add category filter 
router.get('/items', isLoggedIn, async (req,res,next) => {
    try{
        const itemServiceInstance = Container.get('itemService');
        const items = await itemServiceInstance.getItemList();
        res.json({
            data : items,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/detail/:itemId', isLoggedIn, async (req, res, next) => {
    try{
        const itemServiceInstance = Container.get('itemService');
        const item = await itemServiceInstance.getItem(req.params.itemId);
        if(!item){
            return res.status(201).json({
                data : [],
                msg : "wrong id",
            });
        }
        return res.json({
            data : item,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;