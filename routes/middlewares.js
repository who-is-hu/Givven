const {User} = require('../models');

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(403).send('login 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    } else {
        res.status(403).send('이미 login 돼어있음');
    }
};

exports.isUserCharity = async (req, res, next) => {
    try{
        const exUser = await User.findOne({
            where : {
                id : req.user.id
            },
            attributes : ['type'],
        });
        if(exUser.type == 'charity'){
            next();
        } else {
            res.json({res : false, msg: '자선단체 권한을 가진 계정이 아닙니다.'});
        }
    }catch(err){
        console.error(err);
    }   
};