var express = require('express');
const home_mongo = require('../mongodb_helper/home_mongo');
const db = require('../config/connection');
const { response } = require('../app');
var router = express.Router();


router.post('/login',async function(req, res, next) {
  if(!req.body.username=='')
  {
  
  
  await db.collection('login').findOne({username:req.body.username,password:req.body.password}).then((response)=>{
    console.log(response);
    if(response.username=='admin@gmail.com' && response.password=='admin'){
      req.session.status=true
      res.redirect('/admin')
      
}
else if(response.username==req.body.username && response.password==req.body.password && response.type=='unicod'){
  req.session.status=true
  res.redirect('/unicod')
}
else if(response.username==req.body.username && response.password==req.body.password && response.type=='po'){
  req.session.status=true
  req.session.po_id=response
  console.log(response);
  res.redirect('/po')
}
else if(response.username==req.body.username && response.password==req.body.password && response.type=='volunteer'){
  req.session.status=true
  res.redirect('/volunteer')
}
})
}
else{
  res.redirect('/login')}
  
});





router.post('/unicod_register', function(req, res, next) {
  home_mongo.unicod_register(req.body,(callback)=>{
    let photo = req.files.photo
    let sign = req.files.sign
    photo.mv('public/images/photo/'+callback.insertedId+'.jpg')
    sign.mv('public/images/sign/'+callback.insertedId+'.jpg')
    res.render('home/index',{indexhome:true});
  })});
  
  router.post('/po_register', function(req, res, next) {
    home_mongo.po_register(req.body,(callback)=>{
      let photo = req.files.photo
      let sign = req.files.sign
    photo.mv('public/images/photo/'+callback.insertedId+'.jpg')
    sign.mv('public/images/sign/'+callback.insertedId+'.jpg')
  res.render('home/index',{indexhome:true});
})});

router.post('/volunteer_register', function(req, res, next) {
  home_mongo.volunteer_register(req.body,(callback)=>{
    let photo = req.files.photo
    let sign = req.files.sign
    photo.mv('public/images/photo/'+callback.insertedId+'.jpg')
    sign.mv('public/images/sign/'+callback.insertedId+'.jpg')
  res.render('home/index',{indexhome:true});
})});
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

  
  // if(req.body.username=='admin@gmail.com' && req.body.password=='admin'){
  //   res.render('admin/admin_home',{adminroute:true});}
  // else if(req.body.username=='unicod@gmail.com' && req.body.password=='unicod'){
  //   res.render('unicod/unicod_home',{unicodroute:true});}
  // else if(req.body.username=='po@gmail.com' && req.body.password=='po'){
  //   res.render('po/po_home',{poroute:true});}
  //   else if(req.body.username=='secretary@gmail.com' && req.body.password=='secretary'){
  //     res.render('secretary/secretary_home',{secretaryroute:true});}
  //     else if(req.body.username=='volunteer@gmail.com' && req.body.password=='volunteer'){
  //       res.render('volunteer/volunteer_home',{volunteerroute:true});}






/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/index',{indexhome:true});
});
router.get('/unicod_register', function(req, res, next) {
  res.render('home/unicod_register',{indexRoute:true});
});
router.get('/po_register', function(req, res, next) {
  res.render('home/po_register',{indexRoute:true});
});
router.get('/volunteer_register', function(req, res, next) {
  res.render('home/volunteer_register',{indexRoute:true});
});
router.get('/suggestion', function(req, res, next) {
  res.render('home/suggestion',{indexRoute:true});
});
router.get('/feedback', function(req, res, next) {
  res.render('home/feedback',{indexRoute:true});
});

router.get('/login', function(req, res, next) {
  res.render('home/login',{indexRoute:true});
});

module.exports = router;
