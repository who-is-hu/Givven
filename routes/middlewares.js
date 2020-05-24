const {User} = require('../models');

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(401).json({
            result : false,
            msg : "로그인이 필요합니다."
        });
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    } else {
        res.status(201).json({
            result : false,
            msg : "이미 로그인 되어있습니다."
        });
    }
};

exports.isUserCharity = (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.type == 'charity'){
            next();
        }else {
            res.status(403).json({res : false, msg: 'charity 권한을 가진 계정이 아닙니다.'});
        }
    } else {
        res.status(401).json({
            result : false,
            msg : "로그인이 필요합니다."
        });
    }
};
exports.isUserSeller = (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.type == 'seller'){
            next();
        }else {
            res.status(403).json({res : false, msg: 'seller 권한을 가진 계정이 아닙니다.'});
        }
    } else {
        res.status(401).json({
            result : false,
            msg : "로그인이 필요합니다."
        });
    }
};