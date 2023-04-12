var express = require('express');
const unicod_mongo = require('../mongodb_helper/unicod_mongo');
var router = express.Router();
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const db = require('../config/connection');

router.post('/unicod_account', function(req, res, next) {
  unicod_mongo.unicod_account(req.body)
  res.redirect('/unicod/unicod_account');
});
router.post('/unicod_message', function(req, res, next) {
  unicod_mongo.unicod_message(req.body)
  res.redirect('/unicod/unicod_message');
});


//Post Button
router.post('/accept/:id', async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('po_register').updateOne({_id :objectID },{$set:{status:true}})
  let data = await db.collection('po_register').findOne({_id :objectID })
  let obj = {
    username:data.username,
    password:data.password,
    type:data.type,
  }
  await db.collection('login').insertOne(obj)
  res.redirect('/unicod/approval_po');
});

router.post('/reject/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('po_register').updateOne({_id :objectID },{$set:{status:false}})
  res.redirect('/unicod/approval_po');
});

router.post('/block/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('po_register').updateOne({_id :objectID },{$set:{status:false}})
  await db.collection('login').updateOne({_id :objectID },{$set:{lstatus:false}})
  res.redirect('/unicod/unicod_block');
});

router.post('/unblock/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('po_register').updateOne({_id :objectID },{$set:{status:true}})
  await db.collection('login').updateOne({_id :objectID },{$set:{lstatus:true}})
  res.redirect('/unicod/unicod_unblock');
});





/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.status){
    res.render('unicod/unicod_home',{unicodroute:true});
  }
  else{
    res.redirect('/login')
  }
});

router.get('/unicod_profile', function(req, res, next) {
  res.render('unicod/unicod_profile',{unicodroute:true});
});

router.get('/approval_po',async function(req, res, next) {
  let data =await db.collection('po_register').find({status:'pending'}).toArray()
  res.render('unicod/approval_po',{unicodroute:true,data});
});

router.get('/approval_po_view/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  let data =await db.collection('po_register').findOne({_id :objectID })
  res.render('unicod/approval_po_view',{unicodroute:true,data});
});

router.get('/unicod_account', function(req, res, next) {
  res.render('unicod/unicod_account',{unicodroute:true});
});

router.get('/unicod_account_view',async function(req, res, next) {
  let data= await db.collection('unicod_account').find().toArray()
  res.render('unicod/unicod_account_view',{unicodroute:true,data});
});

router.get('/unicod_po_views',async function(req, res, next) {
  let data=await db.collection('po_register').find({status:true}).toArray()
  res.render('unicod/unicod_po_views',{unicodroute:true,data});
});

router.get('/unicod_volunteer_views',async function(req, res, next) {
  let data=await db.collection('volunteer_register').find({status:true}).toArray()
  res.render('unicod/unicod_volunteer_views',{unicodroute:true,data});
});

router.get('/unicod_po_view/:id', async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  let data=await db.collection('po_register').findOne({_id :objectID })
  res.render('unicod/unicod_po_view',{unicodroute:true,data});
});

router.get('/unicod_volunteer_view/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  let data=await db.collection('volunteer_register').findOne({_id :objectID }) 
  res.render('unicod/unicod_volunteer_view',{unicodroute:true,data});
});

router.get('/unicod_message', function(req, res, next) {
  res.render('unicod/unicod_message',{unicodroute:true});
});

router.get('/unicod_feedback',async function(req, res, next) {
  let data =await db.collection('feedback').find().toArray()
  res.render('unicod/unicod_feedback',{unicodroute:true,data});
});
router.get('/unicod_project_report_views',async function(req, res, next) {
  let data = await db.collection('po_project_report').find().toArray()
  res.render('unicod/unicod_project_report_views',{unicodroute:true,data});
});
router.get('/unicod_camp_report_views',async function(req, res, next) {
  let data = await db.collection('po_camp_report').find().toArray()
  res.render('unicod/unicod_camp_report_views',{unicodroute:true,data});
});

router.get('/unicod_project_report_view/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  let data =await db.collection('po_project_report').findOne({_id :objectID }) 
  let data1 =[]
  await Promise.all(data.volunteer.map(async (value) => {
    const objectID = new ObjectId(value)
    const volunteer = await db.collection('volunteer_register').findOne({_id: objectID})
    data1.push(volunteer)
  }))
  res.render('unicod/unicod_project_report_view',{unicodroute:true,data,data1});
});
router.get('/unicod_camp_report_view/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  let data =await db.collection('po_camp_report').findOne({_id :objectID })
  let data1 =[]
  await Promise.all(data.volunteer.map(async (value) => {
    const objectID = new ObjectId(value)
    const volunteer = await db.collection('volunteer_register').findOne({_id: objectID})
    data1.push(volunteer)
  }))
  res.render('unicod/unicod_camp_report_view',{unicodroute:true,data,data1});
});

router.get('/unicod_block', async function(req, res, next) {
  let data=await db.collection('po_register').find({status:true}).toArray()
  res.render('unicod/unicod_block',{unicodroute:true,data});
});
router.get('/unicod_unblock', async function(req, res, next) {
  let data=await db.collection('po_register').find({status:false}).toArray()
  res.render('unicod/unicod_unblock',{unicodroute:true,data});
});

module.exports = router;