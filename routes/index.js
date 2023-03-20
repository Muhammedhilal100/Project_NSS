var express = require('express');
const home_mongo = require('../mongodb_helper/home_mongo');
var router = express.Router();

router.post('/unicod_register', function(req, res, next) {
  home_mongo.unicod_register(req.body)
  res.render('home/index',{indexhome:true});
});










/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/index',{indexhome:true});
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
