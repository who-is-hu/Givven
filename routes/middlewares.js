const {User} = require('../models');

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.json({
            result : false,
            msg : "로그인이 필요합니다."
        });
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    } else {
        res.json({
            result : false,
            msg : "이미 로그인 되어있습니다."
        });
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