var express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const db = require('../config/connection');
const admin_mongo = require('../mongodb_helper/admin_mongo');
const auth = require('../auth');
const { po_register } = require('../mongodb_helper/home_mongo');
var router = express.Router();



// API FOR GET  DETAILS OF VOLUNTEER
router.post('/getvolunteerDetails',async function(req, res, next) {
  const { getDetails,institute_name  } = req.body
  let volunteer =await db.collection('volunteer_register').aggregate(
    [
      {
        $match: { institute_name:institute_name,year:getDetails } 
      },
      { $project: { _id: 1, name: 1, } }
    ]
  ).toArray()
 
  res.json(volunteer)
});

// API FOR GET  DETAILS OF PO
router.post('/getpoDetails',async function(req, res, next) {
  const { getDetails,university  } = req.body
  let po =await db.collection('po_register').aggregate(
    [
      {
        $match: { university:university,year:getDetails } 
      },
      { $project: { _id: 1, name: 1,institute_name:1} }
    ]
  ).toArray()
 console.log(po);
  res.json(po)
});

// API FOR GET  DETAILS OF UNICOD
router.post('/getunicodDetails',async function(req, res, next) {
  const { getDetails  } = req.body
  let unicod =await db.collection('unicod_register').aggregate(
    [
      {
        $match: { year:getDetails } 
      },
      { $project: { _id: 1, name: 1,university_name: 1} }
    ]
  ).toArray()
 console.log(unicod);
  res.json(unicod)
});



// API FOR GET  INSTITUTE
router.post('/getInstitute',async function(req, res, next) {
  let universityname = req.body.universityName
  let institutename =await db.collection('po_register').aggregate(
    [
      {
        $match: { university:universityname } 
      },
      { $project: { _id: 0, institute_name: 1,year:1 } }
    ]
    ).toArray()
    console.log(institutename,'jihbuhn');
    res.json(institutename)
});




// API FOR GET YEAR
router.post('/getYear',async function(req, res, next) {
  let institutename = req.body.instituteName
  let year =await db.collection('volunteer_register').aggregate(
    [
      {
        $match: { institute_name:institutename } 
      },
      { $project: { _id: 0, year: 1 } }
    ]
  ).toArray()
  res.json(year)
});


// API FOR GET  DETAILS OF PROJECT REPORT
router.post('/getprojectDetails',async function(req, res, next) {
  const { institute_name  } = req.body
  // console.log(req.body);
  let pr =await db.collection('po_project_report').aggregate(
    [
      {
        $match: { institute_name } 
      },
      { $project: { _id: 1, project_name: 1,year:1 ,category:1} }
    ]
  ).toArray()
  res.json(pr)
});

// API FOR GET  DETAILS OF CAMP REPORT
router.post('/getcampDetails',async function(req, res, next) {
  const { institute_name  } = req.body
  // console.log(req.body);
  let cr =await db.collection('po_camp_report').aggregate(
    [
      {
        $match: { institute_name } 
      },
      { $project: { _id: 1, camp_name: 1,year:1 ,category:1} }
    ]
  ).toArray()
  res.json(cr)
});

// API FOR GET  DETAILS OF ACCOUNT
router.post('/getaccount',async function(req, res, next) {
  const { university_name  } = req.body
  // console.log(req.body);
  let cr =await db.collection('admin_account').aggregate(
    [
      {
        $match: { university_name } 
      },
      { $project: { _id: 1, fund_type: 1,amount:1 ,date:1} }
    ]
  ).toArray()
  res.json(cr)
});


router.post('/admin_account', function(req, res, next) {
  admin_mongo.admin_account(req.body)
  res.redirect('/admin/admin_account');
});
router.post('/admin_index_event', function(req, res, next) {
  admin_mongo.admin_index_event(req.body)
  res.redirect('/admin/admin_index_event');
});
router.post('/admin_index_news', function(req, res, next) {
  admin_mongo.admin_index_news(req.body)
  res.redirect('/admin/admin_index_news');
});
router.post('/admin_message', function(req, res, next) {
  admin_mongo.admin_message(req.body)
  res.redirect('/admin/admin_message');
});


// POST BUTTON

router.post('/accept/:id', async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('unicod_register').updateOne({_id :objectID },{$set:{status:true}})
  let data = await db.collection('unicod_register').findOne({_id :objectID })
  let obj = {
    username:data.username,
    password:data.password,
    type:data.type,
    reg_id:data._id+" "
  }
  await db.collection('login').insertOne(obj)
  await db.collection('login').updateOne({_id :objectID },{$set:{lstatus:true}})
  res.redirect('/admin/approval_unicod')
});

router.post('/reject/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('unicod_register').updateOne({_id :objectID },{$set:{status:false}})
  res.redirect('/admin/approval_unicod');
});

router.post('/delete/:id',async function(req, res, next) {
  console.log('running...');
  console.log(req.params.id,'delete id');
  const objectID =  new ObjectId(req.params.id)
  await db.collection('admin_index_event').deleteOne({_id :objectID })
  res.redirect('/admin/admin_index_event');
});

router.post('/delete1/:id',async function(req, res, next) {
  console.log('running...');
  console.log(req.params.id,'delete id');
  const objectID =  new ObjectId(req.params.id)
  await db.collection('admin_index_news').deleteOne({_id :objectID })
  res.redirect('/admin/admin_index_news');
});

router.post('/block/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('unicod_register').updateOne({_id :objectID },{$set:{status:false}})
  await db.collection('login').updateOne({_id :objectID },{$set:{lstatus:false}})
  res.redirect('/admin/admin_block');
});

router.post('/unblock/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('unicod_register').updateOne({_id :objectID },{$set:{status:true}})
  await db.collection('login').updateOne({_id :objectID },{$set:{lstatus:true}})
  res.redirect('/admin/admin_unblock');
});









/* GET users listing. */
router.get('/',auth,async function(req, res, next) {
    res.render('admin/admin_home',{adminroute:true});
  });

router.get('/admin_profile', function(req, res, next) {
  res.render('admin/admin_profile',{adminroute:true});
});

router.get('/approval_unicod',async function(req, res, next) {
  let data=await db.collection('unicod_register').find({status:'pending'}).toArray()
  res.render('admin/approval_unicod',{adminroute:true,data});
});


router.get('/approval_unicod_view/:id', async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  let data=await db.collection('unicod_register').findOne({_id :objectID })
  res.render('admin/approval_unicod_view',{adminroute:true,data});
});


router.get('/admin_message',async function(req, res, next) {
  let data=await db.collection('unicod_register').find({status:true}).toArray()
  res.render('admin/admin_message',{adminroute:true,data});
});

router.get('/admin_account',async function(req, res, next) {
  let data=await db.collection('unicod_register').find({status:true}).toArray()
  res.render('admin/admin_account',{adminroute:true,data});
});

router.get('/admin_account_view',async function(req, res, next) {
  let data= await db.collection('admin_account').find().toArray()
  let data1=await db.collection('unicod_register').find({status:true}).toArray()
  res.render('admin/admin_account_view',{adminroute:true,data,data1});
});

router.get('/admin_feedback', async function(req, res, next) {
  let data =await db.collection('feedback').find().toArray()
  res.render('admin/admin_feedback',{adminroute:true,data});
});
router.get('/admin_suggestion',async function(req, res, next) {
  let data =await db.collection('suggestion').find().toArray()
  res.render('admin/admin_suggestion',{adminroute:true,data});
});

router.get('/admin_index_event', async function(req, res, next) {
  let data =await db.collection('admin_index_event').find().toArray()
  res.render('admin/admin_index_event',{adminroute:true,data});
});

router.get('/admin_index_news',async function(req, res, next) {
  let data =await db.collection('admin_index_news').find().toArray()
  res.render('admin/admin_index_news',{adminroute:true,data});
});

router.get('/admin_unicod_views',async function(req, res, next) {
  let data=await db.collection('unicod_register').find({status:true}).toArray()
  res.render('admin/admin_unicod_views',{adminroute:true,data});
});

router.get('/admin_po_views', async function(req, res, next) {
  let data=await db.collection('po_register').find({status:true}).toArray()
  let data1=await db.collection('unicod_register').find({status:true}).toArray()
  res.render('admin/admin_po_views',{adminroute:true,data,data1});
});

router.get('/admin_volunteer_views',async function(req, res, next) {
  let data=await db.collection('volunteer_register').find({status:true}).toArray()
  let data1=await db.collection('unicod_register').find({status:true}).toArray()
  let data2=await db.collection('po_register').find({status:true}).toArray()
  res.render('admin/admin_volunteer_views',{adminroute:true,data,data1,data2});
});

router.get('/admin_unicod_view/:id', async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  let data=await db.collection('unicod_register').findOne({_id :objectID })
  res.render('admin/admin_unicod_view',{adminroute:true,data});
});

router.get('/admin_po_view/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  let data=await db.collection('po_register').findOne({_id :objectID })
  res.render('admin/admin_po_view',{adminroute:true,data});
});

router.get('/admin_volunteer_view/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  let data=await db.collection('volunteer_register').findOne({_id :objectID }) 
  res.render('admin/admin_volunteer_view',{adminroute:true,data});
});
  
router.get('/admin_project_report_views',async function(req, res, next) {
  let data1=await db.collection('unicod_register').find({status:true}).toArray()
  let data2=await db.collection('po_register').find({status:true}).toArray()
  let data = await db.collection('po_project_report').find().toArray()
  res.render('admin/admin_project_report_views',{adminroute:true,data,data1,data2});
});
router.get('/admin_camp_report_views',async function(req, res, next) {
  let data1=await db.collection('unicod_register').find({status:true}).toArray()
  let data2=await db.collection('po_register').find({status:true}).toArray()
  let data = await db.collection('po_camp_report').find().toArray()
  res.render('admin/admin_camp_report_views',{adminroute:true,data,data1,data2});
});
router.get('/admin_project_report_view/:id',async function(req, res, next) {
  req.params.id
    const objectID =  new ObjectId(req.params.id)
    let data =await db.collection('po_project_report').findOne({_id :objectID }) 
    let data1 =[]
    await Promise.all(data.volunteer.map(async (value) => {
      const objectID = new ObjectId(value)
      const volunteer = await db.collection('volunteer_register').findOne({_id: objectID})
      data1.push(volunteer)
    }))
  res.render('admin/admin_project_report_view',{adminroute:true,data,data1});
});
router.get('/admin_camp_report_view/:id',async function(req, res, next) {
  req.params.id
    const objectID =  new ObjectId(req.params.id)
    let data =await db.collection('po_camp_report').findOne({_id :objectID })
    let data1 =[]
    await Promise.all(data.volunteer.map(async (value) => {
      const objectID = new ObjectId(value)
      const volunteer = await db.collection('volunteer_register').findOne({_id: objectID})
      data1.push(volunteer)
    }))
  res.render('admin/admin_camp_report_view',{adminroute:true,data,data1});
});
router.get('/admin_block', async function(req, res, next) {
  let data=await db.collection('unicod_register').find({status:true}).toArray()
  res.render('admin/admin_block',{adminroute:true,data});
});
router.get('/admin_unblock', async function(req, res, next) {
  let data=await db.collection('unicod_register').find({status:false}).toArray()
  res.render('admin/admin_unblock',{adminroute:true,data});
});

module.exports = router;
