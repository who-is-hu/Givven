const LocalStrategy = require('passport-local').Strategy;
const bycrypt = require('bcryptjs');

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
    }, async (email, password, done) => {
        try {
            const exUser = await User.findOne({where : { email }});
            if(exUser){
                const result = await bycrypt.compare(password, exUser.password);
                if(result){
                    done(null, exUser);
                } else {
                    done(null, false, { message : "비밀번호가 일치하지 않습니다."});
                }    
            } else {
                done(null, false, {message : '가입되지 않은 회원'});
            }
        } catch (err){
            console.error(err);
            next(err);
        }   
    }));
};