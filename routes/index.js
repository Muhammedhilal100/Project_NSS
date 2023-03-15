var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/index',{indexRoute:true});
});
router.get('/unicod_register', function(req, res, next) {
  res.render('home/unicod_register',{indexRoute:true});
});
router.get('/po_register', function(req, res, next) {
  res.render('home/po_register',{indexRoute:true});
});
router.get('/volunteer_register', function(req, res, next) {
  res.render('home/volunteer_register',{indexRoute:true});
});
router.get('/suggestion', function(req, res, next) {
  res.render('home/suggestion',{indexRoute:true});
});
router.get('/feedback', function(req, res, next) {
  res.render('home/feedback',{indexRoute:true});
});

router.get('/login', function(req, res, next) {
  res.render('home/login',{indexRoute:true});
});

module.exports = router;
