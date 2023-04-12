var express = require('express');
const db = require('../config/connection');
const volunteer_mongo = require('../mongodb_helper/volunteer_mongo');
var router = express.Router();


router.post('/volunteer_workdairy', function(req, res, next) {
  volunteer_mongo.volunteer_workdairy(req.body)
  res.render('volunteer/volunteer_workdairy',{volunteerroute:true});
});
router.post('/volunteer_extra', function(req, res, next) {
  volunteer_mongo.volunteer_extra(req.body)
  res.render('volunteer/volunteer_extra',{volunteerroute:true});
});




/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.status){
    res.render('volunteer/volunteer_home',{volunteerroute:true});
  }
  else{
    res.redirect('/login')
  }
  });

  router.get('/volunteer_profile', function(req, res, next) {
    res.render('volunteer/volunteer_profile',{volunteerroute:true});
  });

  router.get('/volunteer_workdairy',async function(req, res, next) {
    res.render('volunteer/volunteer_workdairy',{volunteerroute:true});
  });

  router.get('/volunteer_workdairy_view',async function(req, res, next) {
    let data=await db.collection('volunteer_workdairy').find().toArray()
    res.render('volunteer/volunteer_workdairy_view',{volunteerroute:true,data});
  });

  router.get('/volunteer_extra', function(req, res, next) {
    res.render('volunteer/volunteer_extra',{volunteerroute:true});
  });

  router.get('/volunteer_extra_view',async function(req, res, next) {
    let data=await db.collection('volunteer_extra').find().toArray()
    res.render('volunteer/volunteer_extra_view',{volunteerroute:true,data});
  });



module.exports = router;