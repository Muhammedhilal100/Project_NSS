var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('po/po_home',{poroute:true});
  });
  router.get('/po_profile', function(req, res, next) {
    res.render('po/po_profile',{poroute:true});
  });
  router.get('/approval_volunteer', function(req, res, next) {
    res.render('po/approval_volunteer',{poroute:true});
  });
  
  router.get('/approval_volunteer_view', function(req, res, next) {
    res.render('po/approval_volunteer_view',{poroute:true});
  });
  router.get('/po_account', function(req, res, next) {
    res.render('po/po_account',{poroute:true});
  });
  router.get('/po_account_view', function(req, res, next) {
    res.render('po/po_account_view',{poroute:true});
  });
  router.get('/po_volunteer_views', function(req, res, next) {
    res.render('po/po_volunteer_views',{poroute:true});
  });
  router.get('/po_volunteer_view', function(req, res, next) {
    res.render('po/po_volunteer_view',{poroute:true});
  });
  router.get('/po_message', function(req, res, next) {
    res.render('po/po_message',{poroute:true});
  });
  router.get('/po_feedback', function(req, res, next) {
    res.render('po/po_feedback',{poroute:true});
  });
  router.get('/po_workdairy', function(req, res, next) {
    res.render('po/po_workdairy',{poroute:true});
  });
  router.get('/po_workdairy_view', function(req, res, next) {
    res.render('po/po_workdairy_view',{poroute:true});
  });
  router.get('/po_attendance', function(req, res, next) {
    res.render('po/po_attendance',{poroute:true});
  });




module.exports = router;
