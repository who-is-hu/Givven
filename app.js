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
const cors = require('cors');
const app = express();

app.use(cors({credentials: true, origin: true}));

const pageRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const campaignRouter = require('./routes/campaign');
const itemRouter = require('./routes/item');
const imgRouter = require('./routes/img');
const orderRouter = require('./routes/order');
// middleware setup
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('port', process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, '/')));
app.use(flash());
sequelize.sync();
passportConfig(passport);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie:{
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

//router
app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/campaign', campaignRouter);
app.use('/item', itemRouter);
app.use('/img', imgRouter);
app.use('/order', orderRouter);
//Container
require('./containerConf')();

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})

// error handler
app.use((err, req, res)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(app.get('port'), () =>{
  console.log(app.get('port'),  ': is waitting...');
});

module.exports = app;