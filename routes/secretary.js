var express = require('express');
const secretary_mongo = require('../mongodb_helper/secretary_mongo');
const db = require('../config/connection');
const { ObjectId } = require('mongodb');
var router = express.Router();




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
  res.render('secretary/secretary_message',{secretaryroute:true});
});




/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('secretary/secretary_home',{secretaryroute:true});
  });

  router.get('/secretary_project_selection',async function(req, res, next) {
    let data=await db.collection('po_project_creation').find({sstatus:"false"}).toArray()
    res.render('secretary/secretary_project_selection',{secretaryroute:true,data});
  });
  router.get('/secretary_camp_selection',async function(req, res, next) {
    let data=await db.collection('po_camp_creation').find({sstatus:"false"}).toArray()
    res.render('secretary/secretary_camp_selection',{secretaryroute:true,data});
  });
  router.get('/secretary_project/:id',async function(req, res, next) {
    req.params.id
    const objectID =  new ObjectId(req.params.id)
    let data =await db.collection('po_project_creation').findOne({_id :objectID })
    console.log(objectID);
    res.render('secretary/secretary_project',{secretaryroute:true,data});
  });

  router.get('/secretary_camp/:id',async function(req, res, next) {
    req.params.id
    const objectID =  new ObjectId(req.params.id)
    let data =await db.collection('po_camp_creation').findOne({_id :objectID })
    res.render('secretary/secretary_camp',{secretaryroute:true,data});
  });

  router.get('/secretary_message', function(req, res, next) {
    res.render('secretary/secretary_message',{secretaryroute:true});
  });



module.exports = router;
