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

router.post('/po_project_creation', function(req, res, next) {
  po_mongo.po_project_creation(req.body)
  res.redirect('/po/po_project_creation');
});
router.post('/po_camp_creation', function(req, res, next) {
  po_mongo.po_camp_creation(req.body)
  res.redirect('/po/po_camp_creation');
});
router.post('/po_project_report/:id',async function(req, res, next) {
  console.log(req.files);
  let arr =[]
  for (let index = 1; index <= 2; index++) {
    const objectID =  new ObjectId()
    arr.push(String(objectID))
  }
 if(req.files){
  for (let index = 0; index <2; index++) {
    const element = arr[index];
    req.files.pr[index].mv('public/images/project/'+element+'.jpg')
  }
 }
  po_mongo.po_project_report(req.body,arr)
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('po_project_creation').updateOne({_id :objectID },{$set:{status:true,sstatus:true}})
  res.redirect('/po/po_project_selection'); 
});
  
router.post('/po_camp_report/:id',async function(req, res, next) {
  let arr =[]
  for (let index = 1; index <15; index++) {
    const objectID =  new ObjectId()
    arr.push(String(objectID))
  }
  for (let index = 0; index <14; index++) {
    const element = arr[index];
    req.files.cr[index].mv('public/images/camp/'+element+'.jpg')
  }
  po_mongo.po_camp_report(req.body,arr)
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('po_camp_creation').updateOne({_id :objectID },{$set:{status:true}})
  res.redirect('/po/po_camp_selection'); 
});

router.post('/po_message', function(req, res, next) {
  po_mongo.po_message(req.body)
  res.render('po/po_message',{poroute:true});
});


router.post('/po_volunteer_views',async function(req, res, next) {
  let data=await db.collection('volunteer_register').find().toArray() 
  res.redirect('/po/po_volunteer_views');
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
  res.redirect('/po/approval_volunteer');
});

router.post('/reject/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('volunteer_register').updateOne({_id :objectID },{$set:{status:false}})
  res.redirect('/po/approval_volunteer');
});

router.post('/block/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('volunteer_register').updateOne({_id :objectID },{$set:{status:false}})
  await db.collection('login').updateOne({_id :objectID },{$set:{lstatus:false}})
  res.redirect('/po/po_block');
});

router.post('/unblock/:id',async function(req, res, next) {
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('volunteer_register').updateOne({_id :objectID },{$set:{status:true}})
  await db.collection('login').updateOne({_id :objectID },{$set:{lstatus:true}})
  res.redirect('/po/po_unblock');
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
  router.get('/po_account_view', async function(req, res, next) {
    let data= await db.collection('po_account').find().toArray()
    res.render('po/po_account_view',{poroute:true,data});
  });
  router.get('/po_volunteer_views',async function(req, res, next) {
    let data=await db.collection('volunteer_register').find({status:true}).toArray()
    res.render('po/po_volunteer_views',{poroute:true,data});
  });
  router.get('/po_volunteer_view/:id',async function(req, res, next) {
    req.params.id
    const objectID =  new ObjectId(req.params.id)
    let data=await db.collection('volunteer_register').findOne({_id :objectID })   
    res.render('po/po_volunteer_view',{poroute:true,data});
  });
  router.get('/po_message', function(req, res, next) {
    res.render('po/po_message',{poroute:true});
  });
  router.get('/po_feedback',async function(req, res, next) {
    let data =await db.collection('feedback').find().toArray()
    res.render('po/po_feedback',{poroute:true,data});
  });
  router.get('/po_workdairy', function(req, res, next) {
    res.render('po/po_workdairy',{poroute:true});
  });
  router.get('/po_workdairy_view',async function(req, res, next) {
    let data=await db.collection('po_workdairy').find().toArray()
    res.render('po/po_workdairy_view',{poroute:true,data});
  });
  router.get('/po_attendance', function(req, res, next) {
    res.render('po/po_attendance',{poroute:true});
  });
  router.get('/po_project_creation', async function(req, res, next) {
    let data = await db.collection('volunteer_register').find({status:true}).toArray()
    res.render('po/po_project_creation',{poroute:true,data});
  });
  router.get('/po_camp_creation',async function(req, res, next) {
    let data = await db.collection('volunteer_register').find({status:true}).toArray()
    res.render('po/po_camp_creation',{poroute:true,data});
  });
  router.get('/po_project_selection',async function(req, res, next) {
    let data=await db.collection('po_project_creation').find({status:"false"}).toArray()
    res.render('po/po_project_selection',{poroute:true,data});
  });
  router.get('/po_camp_selection',async function(req, res, next) {
    let data=await db.collection('po_camp_creation').find({status:"false"}).toArray()
    res.render('po/po_camp_selection',{poroute:true,data});
  });

  router.get('/po_project_report/:id',async function(req, res, next) {
    req.params.id
    const objectID =  new ObjectId(req.params.id)
    let data =await db.collection('po_project_creation').findOne({_id :objectID })
    let data1 = await db.collection('volunteer_register').find({status:true}).toArray()
    let ccid=String(objectID)
    let data2 = await db.collection('secretary_project').findOne({cid:ccid})
    console.log(data2);
    res.render('po/po_project_report',{poroute:true,data,data1,data2});
  });
  router.get('/po_camp_report/:id',async function(req, res, next) {
    req.params.id
    const objectID =  new ObjectId(req.params.id)
    let data =await db.collection('po_camp_creation').findOne({_id :objectID })
    let data1 = await db.collection('volunteer_register').find({status:true}).toArray()
    res.render('po/po_camp_report',{poroute:true,data,data1});
  });
  router.get('/po_project_report_views',async function(req, res, next) {
    let data = await db.collection('po_project_report').find().toArray()
    res.render('po/po_project_report_views',{poroute:true,data,});
  });
  router.get('/po_camp_report_views',async function(req, res, next) {
    let data = await db.collection('po_camp_report').find().toArray()
    res.render('po/po_camp_report_views',{poroute:true,data});
  });
  router.get('/po_project_report_view/:id',async function(req, res, next) {
    req.params.id
    const objectID =  new ObjectId(req.params.id)
    let data =await db.collection('po_project_report').findOne({_id :objectID }) 
    let data1 =[]
    await Promise.all(data.volunteer.map(async (value) => {
      const objectID = new ObjectId(value)
      const volunteer = await db.collection('volunteer_register').findOne({_id: objectID})
      data1.push(volunteer)
    }))
    res.render('po/po_project_report_view',{poroute:true,data,data1});
  });
  router.get('/po_camp_report_view/:id',async function(req, res, next) {
    req.params.id
    const objectID =  new ObjectId(req.params.id)
    let data =await db.collection('po_camp_report').findOne({_id :objectID })
    let data1 =[]
    await Promise.all(data.volunteer.map(async (value) => {
      const objectID = new ObjectId(value)
      const volunteer = await db.collection('volunteer_register').findOne({_id: objectID})
      data1.push(volunteer)
    }))
    res.render('po/po_camp_report_view',{poroute:true,data,data1});
  });
  router.get('/po_secretary',async function(req, res, next) {
    let data =await db.collection('volunteer_register').find({status:true}).toArray()
    res.render('po/po_secretary',{poroute:true,data});
  });
  router.get('/po_secretary_view', function(req, res, next) {
    res.render('po/po_secretary_view',{poroute:true});
  });

  router.get('/po_block', async function(req, res, next) {
    let data=await db.collection('volunteer_register').find({status:true}).toArray()
    res.render('po/po_block',{poroute:true,data});
  });
  router.get('/po_unblock', async function(req, res, next) {
    let data=await db.collection('volunteer_register').find({status:false}).toArray()
    res.render('po/po_unblock',{poroute:true,data});
  });




module.exports = router;
