var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('volunteer/volunteer_home',{volunteerroute:true});
  });

  router.get('/volunteer_profile', function(req, res, next) {
    res.render('volunteer/volunteer_profile',{volunteerroute:true});
  });

  router.get('/volunteer_workdairy', function(req, res, next) {
    res.render('volunteer/volunteer_workdairy',{volunteerroute:true});
  });

  router.get('/volunteer_workdairy_view', function(req, res, next) {
    res.render('volunteer/volunteer_workdairy_view',{volunteerroute:true});
  });



module.exports = router;