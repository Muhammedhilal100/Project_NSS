var express = require('express');
const secretary_mongo = require('../mongodb_helper/secretary_mongo');
const db = require('../config/connection');
const { ObjectId } = require('mongodb');
var router = express.Router();



//////ajax
router.get('/get_status_secretary_project_selection',async function(req, res, next) {
  let volunteer_details =await db.collection('volunteer_register').findOne({username:req.session.volunteer_id.username})
  res.json(volunteer_details)
});






router.post('/secretary_project/:id',async function(req, res, next) {
  let arr =[]
  for (let index = 1; index <= 2; index++) {
    const objectID =  new ObjectId()
    arr.push(String(objectID))
  }
  for (let index = 0; index <2; index++) {
    const element = arr[index];
    req.files.pr[index].mv('public/images/project/'+element+'.jpg')
  }
  secretary_mongo.secretary_project(req.body,arr)
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('po_project_creation').updateOne({_id :objectID },{$set:{sstatus:true}})
  res.redirect('/secretary/secretary_project_selection');
});



router.post('/secretary_camp/:id',async function(req, res, next) {
  let arr =[]
  for (let index = 1; index <15; index++) {
    const objectID =  new ObjectId()
    arr.push(String(objectID))
  }
  for (let index = 0; index <14; index++) {
    const element = arr[index];
    req.files.cr[index].mv('public/images/camp/'+element+'.jpg')
  }
  secretary_mongo.secretary_camp(req.body,arr)
  req.params.id
  const objectID =  new ObjectId(req.params.id)
  await db.collection('po_camp_creation').updateOne({_id :objectID },{$set:{sstatus:true}})
  res.redirect('/secretary/secretary_camp_selection');
});



  
 

router.post('/secretary_message', function(req, res, next) {
  secretary_mongo.secretary_message(req.body)
  res.render('secretary/secretary_message',{volunteerroute:true});
});




/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('secretary/secretary_home',{volunteerroute:true});
  });



  router.get('/secretary_project_selection',async function(req, res, next) {
    let volunteer_details =await db.collection('volunteer_register').findOne({username:req.session.volunteer_id.username})
    let data=await db.collection('po_project_creation').find({sstatus:"false",user_id:volunteer_details.accept_id}).toArray()
    console.log(volunteer_details.secretary_satatus);
    let Secretary_Option_Status = false
    res.render('secretary/secretary_project_selection',{volunteerroute:true,Secretary_Option_Status,data,volunteer_details,example:'example page'});
  });

    
  


  router.get('/secretary_camp_selection',async function(req, res, next) {
    let volunteer_details =await db.collection('volunteer_register').findOne({username:req.session.volunteer_id.username})
    let data=await db.collection('po_camp_creation').find({sstatus:"false",user_id:volunteer_details.accept_id}).toArray()
    res.render('secretary/secretary_camp_selection',{volunteerroute:true,data,volunteer_details});
  });
  router.get('/secretary_project/:id',async function(req, res, next) {
    let volunteer_details =await db.collection('volunteer_register').findOne({username:req.session.volunteer_id.username})
    req.params.id
    const objectID =  new ObjectId(req.params.id)
    let data =await db.collection('po_project_creation').findOne({_id :objectID })
    console.log(objectID);
    res.render('secretary/secretary_project',{volunteerroute:true,data,volunteer_details});
  });

  router.get('/secretary_camp/:id',async function(req, res, next) {
    let volunteer_details =await db.collection('volunteer_register').findOne({username:req.session.volunteer_id.username})
    req.params.id
    const objectID =  new ObjectId(req.params.id)
    let data =await db.collection('po_camp_creation').findOne({_id :objectID })
    res.render('secretary/secretary_camp',{volunteerroute:true,data,volunteer_details});
  });

  router.get('/secretary_message',async function(req, res, next) {
    let volunteer_details =await db.collection('volunteer_register').findOne({username:req.session.volunteer_id.username})
    let data=await db.collection('volunteer_register').find({status:true,accept_id:req.session.volunteer_id.username}).toArray()
    res.render('secretary/secretary_message',{volunteerroute:true,volunteer_details,data});
  });



module.exports = router;
