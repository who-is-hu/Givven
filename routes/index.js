//////////////////////////
// page router
//////////////////////////

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('normal_donation_main.html');
});
router.get('/log_in', function(req, res, next) {
  res.render('log_in.html');
});
router.get('/sign_up', function(req, res, next) {
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
router.get('/charity_shop_detail', function(req, res, next) {
  res.render('charity_shop_detail.html');
});
router.get('/charity_shop_main', function(req, res, next) {
  res.render('charity_shop_main.html');
});
/* normal */
router.get('/normal_donation_detail_donate', function(req, res, next) {
  res.render('normal_donation_detail_donate.html');
});
router.get('/normal_donation_detail_purchase_list', function(req, res, next) {
  res.render('normal_donation_detail_purchase_list.html');
});
router.get('/normal_donation_detail', function(req, res, next) {
  res.render('normal_donation_detail.html');
});
router.get('/normal_donation_main', function(req, res, next) {
  res.render('normal_donation_main.html');
});
router.get('/normal_donation_search_result', function(req, res, next) {
  res.render('normal_donation_search_result.html');
});
router.get('/normal_mypage_main', function(req, res, next) {
  res.render('normal_mypage_main.html');
});
router.get('/normal_mypage_charge', function(req, res, next) {
  res.render('normal_mypage_charge.html');
});
router.get('/normal_shop_detail', function(req, res, next) {
  res.render('normal_shop_detail.html');
});
router.get('/normal_shop_main', function(req, res, next) {
  res.render('normal_shop_main.html');
});
router.get('/normal_shop_search_result', function(req, res, next) {
  res.render('normal_shop_search_result.html');
});
/* seller */
router.get('/seller_mypage_exchange', function(req, res, next) {
  res.render('seller_mypage_exchange.html');
});
router.get('/seller_add_goods', function(req, res, next) {
  res.render('seller_add_goods.html');
});
router.get('/seller_mypage_goods_detail', function(req, res, next) {
  res.render('seller_mypage_goods_detail.html');
});
router.get('/seller_mypage_main', function(req, res, next) {
  res.render('seller_mypage_main.html');
});
router.get('/seller_mypage_order', function(req, res, next) {
  res.render('seller_mypage_order.html');
});

module.exports = router;
