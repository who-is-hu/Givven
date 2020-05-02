var express = require('express');
const passport = require('passport');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const {email, name, password, type} = req.body;
    try{
        const exUser = await User.findOne({where : {email}});
        if(exUser){
            return res.json({
                res: 'fail',
                msg: '이미 존재하는 계정'
            });
        }
        const hash = await bcrypt.hash(password,12);
        await User.create({
            email,
            name,
            password : hash,
            type,
        });
        return res.json({
            res: 'success',
            msg: '회원가입 성공'
        });
        
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/login',isNotLoggedIn,  (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError){
            console.error(authError);
            next(authError);
        }
        if(!user){
            return res.json({res : 'fail', msg : info.msg});
           
        }
        return req.login(user, (logginError) => {
            if (logginError){
                console.error(logginError);
                next(logginError);
            }
            return res.json({ res : 'success', msg : 'login success'});
        });
    })(req, res, next) ;
});

router.get('/logout',isLoggedIn, (req, res, next)=> {
    req.logout();
    req.session.destroy();
    return res.redirect('/');
});

router.get('/isLoggedIn', (req, res, next) => {
    let result;
    if(req.isAuthenticated()){
        res.json({
            res : true,
            type : req.user.dataValues.type 
        });
    } else {
        res.json({
            res : false,
            type : 'guest'
        });
    }
});

// router.get('/userType',  (req, res, next) => {
//     if(req.user){
//         res.json({userType : "guset"});
//     }
// });
module.exports = router;