var express = require('express');
const passport = require('passport');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Container = new (require('../utils/Container.js'))();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, name, password, type } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.json({
        res: 'fail',
        msg: '이미 존재하는 계정',
      });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      name,
      password: hash,
      type,
      point: 0,
    });
    const contractCaller = await Container.get('contractCaller');
    const addUserResultHash = await contractCaller.addUser(email);
    console.log('join hash', addUserResultHash);
    if (addUserResultHash !== undefined) {
      console.log(addUserResultHash);
      return res.status(201).json({
        message: '회원가입 성공',
      });
    } else {
      return res.status(400).json({
        message: '회원가입 실패',
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      next(authError);
    }
    if (!user) {
      return res.status(400).json({
        user: null,
        message: info.msg,
      });
    }
    return req.login(user, logginError => {
      if (logginError) {
        console.error(logginError);
        next(logginError);
      }
      return res.status(200).json({
        user: user.email,
        message: 'success',
      });
    });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  return res.status(204).redirect('/');
});

//로그인 했는지 검사
router.get('/isLoggedIn', (req, res, next) => {
  let result = {};
  if (req.user != null) {
    result.type = req.user.type;
  } else {
    result.type = 'guest';
  }
  return res.json(result);
});

module.exports = router;
