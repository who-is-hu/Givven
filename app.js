const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const flash = require('connect-flash');
const app = express();

const authRouter = require('./routes/auth');
const campaignRouter = require('./routes/campaign');
const itemRouter = require('./routes/item');
const imgRouter = require('./routes/img');
const tradeLogRouter = require('./routes/tradeLog');
const pointRouter = require('./routes/point');

// middleware setup
app.set('port', process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, '/')));
app.use(flash());
sequelize.sync();
passportConfig(passport);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

//router
app.use('/api/auth', authRouter);
app.use('/api/campaign', campaignRouter);
app.use('/api/item', itemRouter);
app.use('/api/img', imgRouter);
app.use('/api/tradeLog', tradeLogRouter);
app.use('/api/point', pointRouter);

//Container
require('./containerConf')();

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), ': is waitting...');
});

module.exports = app;
