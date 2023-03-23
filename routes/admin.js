var express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')
const db = require('../config/connection');

const admin_mongo = require('../mongodb_helper/admin_mongo');
var router = express.Router();
// let id = mongoose.Types.ObjectId()
// let objectID = new id
router.post('/admin_account', function(req, res, next) {
  admin_mongo.admin_account(req.body)
  res.render('admin/admin_account',{adminroute:true});
});
router.post('/admin_index', function(req, res, next) {
  admin_mongo.admin_index(req.body)
  res.render('admin/admin_index',{adminroute:true});
});
router.post('/admin_message', function(req, res, next) {
  admin_mongo.admin_message(req.body)
  res.render('admin/admin_message',{adminroute:true});
});

router.post('/accept/:id', async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('unicod_register').updateOne({_id :objectID },{$set:{status:true}})
  let data = await db.collection('unicod_register').findOne({_id :objectID })
  let obj = {
    username:data.username,
    password:data.password,
    type:data.type,
  }
  await db.collection('login').insertOne(obj)
  res.render('admin/admin_message',{adminroute:true});
});

router.post('/reject/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('unicod_register').updateOne({_id :objectID },{$set:{status:false}})
  res.render('admin/admin_message',{adminroute:true});
});









/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/admin_home',{adminroute:true});
});

router.get('/admin_profile', function(req, res, next) {
  res.render('admin/admin_profile',{adminroute:true});
});

router.get('/approval_unicod',async function(req, res, next) {
  let data=await db.collection('unicod_register').find({status:'false'}).toArray()
  res.render('admin/approval_unicod',{adminroute:true,data});
});


router.get('/approval_unicod_view/:id', async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  let data=await db.collection('unicod_register').findOne({_id :objectID })
  res.render('admin/approval_unicod_view',{adminroute:true,data});
});




router.get('/admin_message', function(req, res, next) {
  res.render('admin/admin_message',{adminroute:true});
});

router.get('/admin_account', function(req, res, next) {
  res.render('admin/admin_account',{adminroute:true});
});

router.get('/admin_account_view', function(req, res, next) {
  res.render('admin/admin_account_view',{adminroute:true});
});

router.get('/admin_feedback', function(req, res, next) {
  res.render('admin/admin_feedback',{adminroute:true});
});

router.get('/admin_index', function(req, res, next) {
  res.render('admin/admin_index',{adminroute:true});
});

router.get('/admin_index_view', function(req, res, next) {
  res.render('admin/admin_index_view',{adminroute:true});
});

router.get('/admin_unicod_views', function(req, res, next) {
  res.render('admin/admin_unicod_views',{adminroute:true});
});

router.get('/admin_po_views', function(req, res, next) {
  res.render('admin/admin_po_views',{adminroute:true});
});

router.get('/admin_volunteer_views', function(req, res, next) {
  res.render('admin/admin_volunteer_views',{adminroute:true});
});

router.get('/admin_unicod_view', function(req, res, next) {
  res.render('admin/admin_unicod_view',{adminroute:true});
});

router.get('/admin_po_view', function(req, res, next) {
  res.render('admin/admin_po_view',{adminroute:true});
});

router.get('/admin_volunteer_view', function(req, res, next) {
  res.render('admin/admin_volunteer_view',{adminroute:true});
});
  
router.get('/admin_project_report_views', function(req, res, next) {
  res.render('admin/admin_project_report_views',{adminroute:true});
});
router.get('/admin_camp_report_views', function(req, res, next) {
  res.render('admin/admin_camp_report_views',{adminroute:true});
});
router.get('/admin_project_report_view', function(req, res, next) {
  res.render('admin/admin_project_report_view',{adminroute:true});
});
router.get('/admin_camp_report_view', function(req, res, next) {
  res.render('admin/admin_camp_report_view',{adminroute:true});
});



module.exports = router;
