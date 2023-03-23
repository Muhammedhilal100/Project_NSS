var express = require('express');
const secretary_mongo = require('../mongodb_helper/secretary_mongo');
var router = express.Router();

router.post('/secretary_project', function(req, res, next) {
  secretary_mongo.secretary_project(req.body)
  res.render('secretary/secretary_project',{secretaryroute:true});
});

router.post('/secretary_camp', function(req, res, next) {
  secretary_mongo.secretary_camp(req.body)
  res.render('secretary/secretary_camp',{secretaryroute:true});
});
router.post('/secretary_message', function(req, res, next) {
  secretary_mongo.secretary_message(req.body)
  res.render('secretary/secretary_message',{secretaryroute:true});
});




/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('secretary/secretary_home',{secretaryroute:true});
  });

  router.get('/secretary_project', function(req, res, next) {
    res.render('secretary/secretary_project',{secretaryroute:true});
  });

  router.get('/secretary_camp', function(req, res, next) {
    res.render('secretary/secretary_camp',{secretaryroute:true});
  });

  router.get('/secretary_message', function(req, res, next) {
    res.render('secretary/secretary_message',{secretaryroute:true});
  });



module.exports = router;
