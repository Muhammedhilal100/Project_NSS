var express = require('express');
const home_mongo = require('../mongodb_helper/home_mongo');
const db = require('../config/connection');
const { response } = require('../app');
var router = express.Router();


router.post('/login',async function(req, res, next) {
  if(!req.body.username=='')
  {
  
  
  await db.collection('login').findOne({username:req.body.username,password:req.body.password}).then((response)=>{
    if(response.username=='admin@gmail.com' && response.password=='admin'){
      req.session.status=true
      req.session.admin_id=response
      res.redirect('/admin')
      
}
else if(response.username==req.body.username && response.password==req.body.password && response.type=='unicod'){
  req.session.status=true
  req.session.unicod_id=response
  res.redirect('/unicod')
}
else if(response.username==req.body.username && response.password==req.body.password && response.type=='po'){
  req.session.status=true
  req.session.po_id=response
  res.redirect('/po')
}
else if(response.username==req.body.username && response.password==req.body.password && response.type=='volunteer'){
  req.session.status=true
  req.session.volunteer_id=response
  res.redirect('/volunteer')
}
})
}
else{
  res.redirect('/login')}
  
});





router.post('/unicod_register', async function(req, res, next) {
  let data=await db.collection('unicod_register').findOne({username:req.body.username})
  if(data){
    req.session.error='Username already exist'
    res.redirect('/unicod_register')
  }
  else{
    home_mongo.unicod_register(req.body,(callback)=>{
      let photo = req.files.photo
      let sign = req.files.sign
      photo.mv('public/images/photo/'+callback.insertedId+'.jpg')
      sign.mv('public/images/sign/'+callback.insertedId+'.jpg')
      res.render('home/index',{indexhome:true});
    })}});
  
  router.post('/po_register',async function(req, res, next) {
    let data=await db.collection('po_register').findOne({username:req.body.username})
    if(data){
      req.session.error='Username already exist'
      res.redirect('/po_register')
    }
    else{
    home_mongo.po_register(req.body,(callback)=>{
      let photo = req.files.photo
      let sign = req.files.sign
    photo.mv('public/images/photo/'+callback.insertedId+'.jpg')
    sign.mv('public/images/sign/'+callback.insertedId+'.jpg')
  res.render('home/index',{indexhome:true});
})}});

router.post('/volunteer_register',async function(req, res, next) {
  let data=await db.collection('volunteer_register').findOne({username:req.body.username})
    if(data){
      req.session.error='Username already exist'
      res.redirect('/volunteer_register')
    }
    else{
  home_mongo.volunteer_register(req.body,(callback)=>{
    let photo = req.files.photo
    let sign = req.files.sign
    photo.mv('public/images/photo/'+callback.insertedId+'.jpg')
    sign.mv('public/images/sign/'+callback.insertedId+'.jpg')
  res.render('home/index',{indexhome:true});
})}});

router.post('/suggestion', function(req, res, next) {
  home_mongo.suggestion(req.body)
  res.render('home/index',{indexhome:true});
});
router.post('/feedback', function(req, res, next) {
  home_mongo.feedback(req.body)
  res.render('home/index',{indexhome:true});
});


router.post('/login', function(req, res, next) {

});

  
 




/* GET home page. */
router.get('/',async function(req, res, next) {
  let data =await db.collection('admin_index_event').find().toArray()
  let data1=await db.collection('admin_index_news').find().toArray()
  res.render('home/index',{indexhome:true,data,data1});
});
router.get('/unicod_register', function(req, res, next) {
  let er=req.session.error
  res.render('home/unicod_register',{indexRoute:true,er});
});
router.get('/po_register',async function(req, res, next) {
  let er=req.session.error
  let data=await db.collection('unicod_register').find({status:true}).toArray()
  res.render('home/po_register',{indexRoute:true,data,er});
});
router.get('/volunteer_register',async function(req, res, next) {
  let er=req.session.error
  let data=await db.collection('po_register').find({status:true}).toArray()
  res.render('home/volunteer_register',{indexRoute:true,data,er});
});
router.get('/suggestion', function(req, res, next) {
  res.render('home/suggestion',{indexRoute:true});
});
router.get('/feedback',async function(req, res, next) {
  let data=await db.collection('unicod_register').find({status:true}).toArray()
  let data1=await db.collection('po_register').find({status:true}).toArray()
  res.render('home/feedback',{indexRoute:true,data,data1});
});

router.get('/login', function(req, res, next) {
  res.render('home/login',{indexRoute:true});
});

module.exports = router;
