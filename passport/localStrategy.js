const LocalStrategy = require('passport-local').Strategy;
const bycrypt = require('bcryptjs');

const { User } = require('../models');

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bycrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(new Error('비밀번호가 일치하지 않습니다.'), null);
            }
          } else {
            done(new Error('가입되지않은 회원입니다.'), null);
          }
        } catch (err) {
          console.error(err);
          next(err);
        }
      },
    ),
  );
};
