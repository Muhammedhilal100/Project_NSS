var express = require('express');
const po_mongo = require('../mongodb_helper/po_mongo');
var router = express.Router();
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const db = require('../config/connection');


router.post('/po_account', function(req, res, next) {
  po_mongo.po_account(req.body)
  res.render('po/po_account',{poroute:true});
});
router.post('/po_workdairy', function(req, res, next) {
  po_mongo.po_workdairy(req.body)
  res.render('po/po_workdairy',{poroute:true});
});

router.post('/po_meeting', function(req, res, next) {
  po_mongo.po_meeting(req.body)
  res.render('po/po_meeting',{poroute:true});
});
router.post('/po_project_creation', function(req, res, next) {
  po_mongo.po_project_creation(req.body)
  res.render('po/po_project_creation',{poroute:true});
});
router.post('/po_camp_creation', function(req, res, next) {
  po_mongo.po_camp_creation(req.body)
  res.render('po/po_camp_creation',{poroute:true});
});
router.post('/po_project_report', function(req, res, next) {
  po_mongo.po_project_report(req.body)
  res.render('po/po_project_report',{poroute:true});
});
router.post('/po_camp_report', function(req, res, next) {
  po_mongo.po_camp_report(req.body)
  res.render('po/po_camp_report',{poroute:true});
});
router.post('/po_message', function(req, res, next) {
  po_mongo.po_message(req.body)
  res.render('po/po_message',{poroute:true});
});


router.post('/accept/:id', async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('volunteer_register').updateOne({_id :objectID },{$set:{status:true}})
  let data = await db.collection('volunteer_register').findOne({_id :objectID })
  let obj = {
    username:data.username,
    password:data.password,
    type:data.type,
  }
  await db.collection('login').insertOne(obj)
  res.render('po/approval_volunteer',{unicodroute:true});
});

router.post('/reject/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('volunteer_register').updateOne({_id :objectID },{$set:{status:false}})
  res.render('po/approval_volunteer',{unicodroute:true});
});







/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('po/po_home',{poroute:true});
  });
  router.get('/po_profile', function(req, res, next) {
    res.render('po/po_profile',{poroute:true});
  });

  router.get('/approval_volunteer',async function(req, res, next) {
    let data =await db.collection('volunteer_register').find({status:'pending'}).toArray()
    res.render('po/approval_volunteer',{poroute:true,data});
  });

  router.get('/approval_volunteer_view/:id',async function(req, res, next) {
    req.params.id
    const objectID =  new ObjectId(req.params.id)
    let data =await db.collection('volunteer_register').findOne({_id :objectID })
    res.render('po/approval_volunteer_view',{poroute:true,data});
  });

  router.get('/po_account', function(req, res, next) {
    res.render('po/po_account',{poroute:true});
  });
  router.get('/po_account_view', function(req, res, next) {
    res.render('po/po_account_view',{poroute:true});
  });
  router.get('/po_volunteer_views', function(req, res, next) {
    res.render('po/po_volunteer_views',{poroute:true});
  });
  router.get('/po_volunteer_view', function(req, res, next) {
    res.render('po/po_volunteer_view',{poroute:true});
  });
  router.get('/po_message', function(req, res, next) {
    res.render('po/po_message',{poroute:true});
  });
  router.get('/po_feedback', function(req, res, next) {
    res.render('po/po_feedback',{poroute:true});
  });
  router.get('/po_workdairy', function(req, res, next) {
    res.render('po/po_workdairy',{poroute:true});
  });
  router.get('/po_workdairy_view', function(req, res, next) {
    res.render('po/po_workdairy_view',{poroute:true});
  });
  router.get('/po_attendance', function(req, res, next) {
    res.render('po/po_attendance',{poroute:true});
  });
  router.get('/po_meeting', function(req, res, next) {
    res.render('po/po_meeting',{poroute:true});
  });
  router.get('/po_project_creation', function(req, res, next) {
    res.render('po/po_project_creation',{poroute:true});
  });
  router.get('/po_camp_creation', function(req, res, next) {
    res.render('po/po_camp_creation',{poroute:true});
  });
  router.get('/po_project_report', function(req, res, next) {
    res.render('po/po_project_report',{poroute:true});
  });
  router.get('/po_camp_report', function(req, res, next) {
    res.render('po/po_camp_report',{poroute:true});
  });
  router.get('/po_project_report_views', function(req, res, next) {
    res.render('po/po_project_report_views',{poroute:true});
  });
  router.get('/po_camp_report_views', function(req, res, next) {
    res.render('po/po_camp_report_views',{poroute:true});
  });
  router.get('/po_project_report_view', function(req, res, next) {
    res.render('po/po_project_report_view',{poroute:true});
  });
  router.get('/po_camp_report_view', function(req, res, next) {
    res.render('po/po_camp_report_view',{poroute:true});
  });
  router.get('/po_secretary', function(req, res, next) {
    res.render('po/po_secretary',{poroute:true});
  });
  router.get('/po_secretary_view', function(req, res, next) {
    res.render('po/po_secretary_view',{poroute:true});
  });


module.exports = router;
