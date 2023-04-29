var express = require('express');
const db = require('../config/connection');
const volunteer_mongo = require('../mongodb_helper/volunteer_mongo');
const auth = require('../auth');
var router = express.Router();


router.post('/volunteer_workdairy', function(req, res, next) {
    console.log(req.body);
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
   let workdairy = await db.collection('volunteer_workdairy').find({user_id:req.session.volunteer_id.username}).toArray()
  // console.log(workdairy);
  let lists =[]
   let data=await db.collection('po_project_report').find({user_id:volunteer_details.accept_id}).toArray()
    // data.map((value,index)=>{
    //   // console.log(data.length);
    //   value._id+''
    //   workdairy.map((workdairy_value)=>{
    //     if(workdairy_value.prject_id===value._id+''===false){
    //       console.log('get copy')
    //       console.log(workdairy_value.prject_id===value._id+'');
    //       if(index===){

    //         lists.push(value)
    //       }
    //     }
    //   })
    // })
    // console.log(workdairy_value.prject_id===value._id+'','project _ id :');
    // console.log(lists,'-------------------------')
    let result = data
    .filter((value) => value.volunteer.includes(req.session.volunteer_id.reg_id))
    .map((value) => ({ id: value._id+'', name: value.project_name.trim() }));
    // console.log(result); 
    res.render('volunteer/volunteer_workdairy',{volunteerroute:true,volunteer_details,result});
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