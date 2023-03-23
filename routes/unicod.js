var express = require('express');
const unicod_mongo = require('../mongodb_helper/unicod_mongo');
var router = express.Router();

router.post('/unicod_account', function(req, res, next) {
  unicod_mongo.unicod_account(req.body)
  res.render('unicod/unicod_account',{unicodroute:true});
});
router.post('/unicod_message', function(req, res, next) {
  unicod_mongo.unicod_message(req.body)
  res.render('unicod/unicod_message',{unicodroute:true});
});






/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('unicod/unicod_home',{unicodroute:true});
});

router.get('/unicod_profile', function(req, res, next) {
  res.render('unicod/unicod_profile',{unicodroute:true});
});

router.get('/approval_po', function(req, res, next) {
  res.render('unicod/approval_po',{unicodroute:true});
});

router.get('/approval_po_view', function(req, res, next) {
  res.render('unicod/approval_po_view',{unicodroute:true});
});

router.get('/unicod_account', function(req, res, next) {
  res.render('unicod/unicod_account',{unicodroute:true});
});

router.get('/unicod_account_view', function(req, res, next) {
  res.render('unicod/unicod_account_view',{unicodroute:true});
});

router.get('/unicod_po_views', function(req, res, next) {
  res.render('unicod/unicod_po_views',{unicodroute:true});
});

router.get('/unicod_volunteer_views', function(req, res, next) {
  res.render('unicod/unicod_volunteer_views',{unicodroute:true});
});

router.get('/unicod_po_view', function(req, res, next) {
  res.render('unicod/unicod_po_view',{unicodroute:true});
});

router.get('/unicod_volunteer_view', function(req, res, next) {
  res.render('unicod/unicod_volunteer_view',{unicodroute:true});
});

router.get('/unicod_message', function(req, res, next) {
  res.render('unicod/unicod_message',{unicodroute:true});
});

router.get('/unicod_feedback', function(req, res, next) {
  res.render('unicod/unicod_feedback',{unicodroute:true});
});
router.get('/unicod_project_report_views', function(req, res, next) {
  res.render('unicod/unicod_project_report_views',{unicodroute:true});
});
router.get('/unicod_camp_report_views', function(req, res, next) {
  res.render('unicod/unicod_camp_report_views',{unicodroute:true});
});

router.get('/unicod_project_report_view', function(req, res, next) {
  res.render('unicod/unicod_project_report_view',{unicodroute:true});
});
router.get('/unicod_camp_report_view', function(req, res, next) {
  res.render('unicod/unicod_camp_report_view',{unicodroute:true});
});

module.exports = router;