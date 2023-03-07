var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/admin_home',{adminroute:true});
});

router.get('/admin_profile', function(req, res, next) {
  res.render('admin/admin_profile',{adminroute:true});
});

router.get('/approval_unicod', function(req, res, next) {
  res.render('admin/approval_unicod',{adminroute:true});
});

router.get('/approval_unicod_view', function(req, res, next) {
  res.render('admin/approval_unicod_view',{adminroute:true});
});

router.get('/admin_message', function(req, res, next) {
  res.render('admin/admin_message',{adminroute:true});
});

router.get('/admin_account', function(req, res, next) {
  res.render('admin/admin_account',{adminroute:true});
});

router.get('/admin_account_view', function(req, res, next) {
  res.render('admin/admin_account_view',{adminroute:true});
});

router.get('/admin_feedback', function(req, res, next) {
  res.render('admin/admin_feedback',{adminroute:true});
});

router.get('/admin_index', function(req, res, next) {
  res.render('admin/admin_index',{adminroute:true});
});

router.get('/admin_index_view', function(req, res, next) {
  res.render('admin/admin_index_view',{adminroute:true});
});

router.get('/admin_unicod_view', function(req, res, next) {
  res.render('admin/admin_unicod_view',{adminroute:true});
});

router.get('/admin_po_view', function(req, res, next) {
  res.render('admin/admin_po_view',{adminroute:true});
});

router.get('/admin_volunteer_view', function(req, res, next) {
  res.render('admin/admin_volunteer_view',{adminroute:true});
});

router.get('/unicod_view', function(req, res, next) {
  res.render('admin/unicod_view',{adminroute:true});
});

router.get('/po_view', function(req, res, next) {
  res.render('admin/po_view',{adminroute:true});
});

router.get('/volunteer_view', function(req, res, next) {
  res.render('admin/volunteer_view',{adminroute:true});
});

router.get('/admin_report', function(req, res, next) {
  res.render('admin/admin_report',{adminroute:true});
});

module.exports = router;
