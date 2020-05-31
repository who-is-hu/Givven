//////////////////////////
// page router
//////////////////////////

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('normal_donation_main.html');
});
router.get('/loginPage', function(req, res, next) {
  res.render('log_in.html');
});
router.get('/signupPage', function(req, res, next) {
  res.render('sign_up.html');
});

/* campaign 관련 page */
router.get('/charity_campaign_detail_purchase_list', function(req, res, next) {
  res.render('charity_campaign_detail_purchase_list.html');
});
router.get('/charity_campaign_detail', function(req, res, next) {
  res.render('charity_campaign_detail.html');
});
router.get('/charity_campaign_make', function(req, res, next) {
  res.render('charity_campaign_make.html');
});
router.get('/charity_mypage_main', function(req, res, next) {
  res.render('charity_mypage_main.html');
});
router.get('/charity_shop_detail_purchase', function(req, res, next) {
  res.render('charity_shop_detail_purchase.html');
});
router.get('/signupPage', function(req, res, next) {
  res.render('charity_shop_detail.html');
});
router.get('/signupPage', function(req, res, next) {
  res.render('charity_shop_main.html');
});
router.get('./itemRegister', function(req, res, next) {
  res.render('seller_add_goods.html');
})
module.exports = router;
