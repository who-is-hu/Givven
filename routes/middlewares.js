const { User } = require('../models');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      message: '로그인이 필요합니다.',
    });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(400).json({
      message: '이미 로그인 되어있습니다.',
    });
  }
};

exports.isUserCharity = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.type == 'charity') {
      next();
    } else {
      res.status(401).json({ message: 'charity 권한을 가진 계정이 아닙니다.' });
    }
  } else {
    res.status(401).json({
      message: '로그인이 필요합니다.',
    });
  }
};
exports.isUserSeller = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.type == 'seller') {
      next();
    } else {
      res.status(401).json({ message: 'seller 권한을 가진 계정이 아닙니다.' });
    }
  } else {
    res.status(401).json({
      message: '로그인이 필요합니다.',
    });
  }
};

exports.wrapAsync = (fn) => {
  return (req, res,next) =>{
    fn(req,res,next).catch(next);
  }
}
