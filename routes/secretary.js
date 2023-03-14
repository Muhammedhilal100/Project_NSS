var express = require('express');
var router = express.Router();

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
