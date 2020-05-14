//////////////////////////
// page router
//////////////////////////

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('normal_main.html');
});
router.get('/loginPage', function(req, res, next) {
  res.render('log_in.html');
});
router.get('/signupPage', function(req, res, next) {
  res.render('sign_up.html');
});
module.exports = router;
