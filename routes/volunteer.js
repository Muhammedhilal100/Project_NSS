var express = require('express');
const db = require('../config/connection');
const volunteer_mongo = require('../mongodb_helper/volunteer_mongo');
const auth = require('../auth');
var router = express.Router();


router.post('/volunteer_workdairy', function(req, res, next) {
  volunteer_mongo.volunteer_workdairy(req.body)
    res.redirect('/volunteer/volunteer_workdairy');
});
router.post('/volunteer_extra', function(req, res, next) {
  volunteer_mongo.volunteer_extra(req.body)
    res.redirect('/volunteer/volunteer_extra');
});




/* GET home page. */
router.get('/',auth,async function(req, res, next) {
  let volunteer_details =await db.collection('volunteer_register').findOne({username:req.session.volunteer_id.username})
    res.render('volunteer/volunteer_home',{volunteerroute:true,volunteer_details});
});
  router.get('/volunteer_profile',async function(req, res, next) {
    let volunteer_details =await db.collection('volunteer_register').findOne({username:req.session.volunteer_id.username})
    res.render('volunteer/volunteer_profile',{volunteerroute:true,volunteer_details});
  });

  router.get('/volunteer_workdairy',async function(req, res, next) {
    let volunteer_details =await db.collection('volunteer_register').findOne({username:req.session.volunteer_id.username})
    res.render('volunteer/volunteer_workdairy',{volunteerroute:true,volunteer_details});
  });

  router.get('/volunteer_workdairy_view',async function(req, res, next) {
    let data=await db.collection('volunteer_workdairy').find().toArray()
    let volunteer_details =await db.collection('volunteer_register').findOne({username:req.session.volunteer_id.username})
    res.render('volunteer/volunteer_workdairy_view',{volunteerroute:true,volunteer_details,data});
  });

  router.get('/volunteer_extra',async function(req, res, next) {
    let volunteer_details =await db.collection('volunteer_register').findOne({username:req.session.volunteer_id.username})
    res.render('volunteer/volunteer_extra',{volunteerroute:true,volunteer_details});
  });

  router.get('/volunteer_extra_view',async function(req, res, next) {
    let data=await db.collection('volunteer_extra').find().toArray()
    let volunteer_details =await db.collection('volunteer_register').findOne({username:req.session.volunteer_id.username})
    res.render('volunteer/volunteer_extra_view',{volunteerroute:true,volunteer_details,data});
  });



module.exports = router;