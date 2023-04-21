var express = require('express');
const unicod_mongo = require('../mongodb_helper/unicod_mongo');
var router = express.Router();
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const db = require('../config/connection');
const auth = require('../auth');


// API FOR GET  DETAILS OF PO
router.post('/getpoDetails',async function(req, res, next) {
  const { getDetails  } = req.body
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  let po =await db.collection('po_register').aggregate(
    [
      {
        $match: { year:getDetails, status: true, university: unicod_details.university_name } 
      },
      { $project: { _id: 1, name: 1,university_name: 1} }
    ]
  ).toArray()
  res.json(po)
});




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
  await db.collection('po_register').updateOne({_id :objectID },{$set:{status:true,accept_id:req.session.unicod_id.username}})
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
router.get('/',auth,async function(req, res, next) {
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  res.render('unicod/unicod_home',{unicodroute:true,unicod_details});
});

router.get('/unicod_profile',async function(req, res, next) {
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  res.render('unicod/unicod_profile',{unicodroute:true,unicod_details});
});

router.get('/approval_po',async function(req, res, next) {
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  let data =await db.collection('po_register').find({status:'pending',university:unicod_details.university_name}).toArray()
  res.render('unicod/approval_po',{unicodroute:true,unicod_details,data});
});

router.get('/approval_po_view/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  let data =await db.collection('po_register').findOne({_id :objectID })
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  res.render('unicod/approval_po_view',{unicodroute:true,unicod_details,data});
});

router.get('/unicod_account',async function(req, res, next) {
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  res.render('unicod/unicod_account',{unicodroute:true,unicod_details});
});

router.get('/unicod_account_view',async function(req, res, next) {
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  let data= await db.collection('unicod_account').find({userid:unicod_details.username}).toArray()
  res.render('unicod/unicod_account_view',{unicodroute:true,unicod_details,data});
});

router.get('/unicod_po_views',async function(req, res, next) {
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  let data=await db.collection('po_register').find({status:true,university:unicod_details.university_name}).toArray()
  res.render('unicod/unicod_po_views',{unicodroute:true,unicod_details,data});
  // res.json(data)
});

router.get('/unicod_volunteer_views',async function(req, res, next) {
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  let data1 = await db.collection('po_register').findOne({university:unicod_details.university_name})
  let data=await db.collection('volunteer_register').find({status:true,institute_name:data1.institute_name}).toArray()
  res.render('unicod/unicod_volunteer_views',{unicodroute:true,unicod_details,data});
});

router.get('/unicod_po_view/:id', async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  let data=await db.collection('po_register').findOne({_id :objectID })
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  res.render('unicod/unicod_po_view',{unicodroute:true,unicod_details,data});
});

router.get('/unicod_volunteer_view/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  let data=await db.collection('volunteer_register').findOne({_id :objectID }) 
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  res.render('unicod/unicod_volunteer_view',{unicodroute:true,unicod_details,data});
});

router.get('/unicod_message',async function(req, res, next) {
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  res.render('unicod/unicod_message',{unicodroute:true,unicod_details});
});

router.get('/unicod_feedback',async function(req, res, next) {
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  let data =await db.collection('feedback').find({university_name:unicod_details.university_name}).toArray()
  res.render('unicod/unicod_feedback',{unicodroute:true,unicod_details,data});
});
router.get('/unicod_project_report_views',async function(req, res, next) {
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  let data1 = await db.collection('po_register').findOne({university:unicod_details.university_name})
  let data = await db.collection('po_project_report').find().toArray()
  res.render('unicod/unicod_project_report_views',{unicodroute:true,unicod_details,data});
});
router.get('/unicod_camp_report_views',async function(req, res, next) {
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  let data1 = await db.collection('po_register').findOne({university:unicod_details.university_name})
  let data = await db.collection('po_camp_report').find().toArray()
  res.render('unicod/unicod_camp_report_views',{unicodroute:true,unicod_details,data});
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
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  res.render('unicod/unicod_project_report_view',{unicodroute:true,unicod_details,data,data1});
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
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  res.render('unicod/unicod_camp_report_view',{unicodroute:true,unicod_details,data,data1});
});

router.get('/unicod_block', async function(req, res, next) {
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  let data=await db.collection('po_register').find({status:true,university:unicod_details.university_name}).toArray()
  res.render('unicod/unicod_block',{unicodroute:true,unicod_details,data});
});
router.get('/unicod_unblock', async function(req, res, next) {
  let unicod_details =await db.collection('unicod_register').findOne({username:req.session.unicod_id.username})
  let data=await db.collection('po_register').find({status:false,university:unicod_details.university_name}).toArray()
  res.render('unicod/unicod_unblock',{unicodroute:true,unicod_details,data});
});

module.exports = router;