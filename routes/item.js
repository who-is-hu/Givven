var express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middlewares');

router.post('/register', isLoggedIn, async (req, res, next) => {
    try{
        
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;