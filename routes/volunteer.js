var express = require('express');
const db = require('../config/connection');
const volunteer_mongo = require('../mongodb_helper/volunteer_mongo');
const auth = require('../auth');
const { ObjectId } = require('mongodb');
var router = express.Router();


// API FOR GET  DETAILS OF PROJECT REPORT FOR WORK DAIRY
router.post('/getprojectDetails1', async function (req, res, next) {
  let volunteer_details = await db.collection('volunteer_register').findOne({ username: req.session.volunteer_id.username })
  const { _id } = req.body
  // console.log(req.body);
  const objectID = new ObjectId(_id)
  let pr = await db.collection('po_project_report').aggregate(
    [
      {
        $match: { _id:objectID, user_id: volunteer_details.accept_id }
      },
      { $project: { _id: 1, project_name: 1, year: 1, category: 1,date:1,hours:1 } }
    ]
  ).toArray()
  console.log(pr);
  res.json(pr)
});
















router.post('/volunteer_workdairy', function (req, res, next) {
  console.log(req.body, 'body------------');
  volunteer_mongo.volunteer_workdairy(req.body)
  res.redirect('/volunteer/volunteer_workdairy');
});
router.post('/volunteer_extra', function (req, res, next) {
  volunteer_mongo.volunteer_extra(req.body)
  res.redirect('/volunteer/volunteer_extra');
});




/* GET home page. */
router.get('/', auth, async function (req, res, next) {
  let volunteer_details = await db.collection('volunteer_register').findOne({ username: req.session.volunteer_id.username })
  res.render('volunteer/volunteer_home', { volunteerroute: true, volunteer_details });
});
router.get('/volunteer_profile', async function (req, res, next) {
  let volunteer_details = await db.collection('volunteer_register').findOne({ username: req.session.volunteer_id.username })

  res.render('volunteer/volunteer_profile', { volunteerroute: true, volunteer_details });
});

router.get('/volunteer_workdairy', async function (req, res, next) {
  let volunteer_details = await db.collection('volunteer_register').findOne({ username: req.session.volunteer_id.username })
  let workdairy = await db.collection('volunteer_workdairy').find({ user_id: req.session.volunteer_id.username }).toArray()
  let data = await db.collection('po_project_report').find({ user_id: volunteer_details.accept_id }).toArray()
  const updatedvolunteers = data.slice().filter(value => {
    return !workdairy.some(value_workdairy => value._id + '' === value_workdairy.project_id)
  })
  let newArry = []
  updatedvolunteers.map((value) => {
    if (value.volunteer.includes(req.session.volunteer_id.reg_id) === true) newArry.push({ id: value._id, name: value.project_name })
  })
  res.render('volunteer/volunteer_workdairy', { volunteerroute: true, volunteer_details, newArry });
});

router.get('/volunteer_workdairy_view', async function (req, res, next) {
  let data = await db.collection('volunteer_workdairy').find().toArray()
  let volunteer_details = await db.collection('volunteer_register').findOne({ username: req.session.volunteer_id.username })
  res.render('volunteer/volunteer_workdairy_view', { volunteerroute: true, volunteer_details, data });
});

router.get('/volunteer_extra', async function (req, res, next) {
  let volunteer_details = await db.collection('volunteer_register').findOne({ username: req.session.volunteer_id.username })
  res.render('volunteer/volunteer_extra', { volunteerroute: true, volunteer_details });
});

router.get('/volunteer_extra_view', async function (req, res, next) {
  let data = await db.collection('volunteer_extra').find().toArray()
  let volunteer_details = await db.collection('volunteer_register').findOne({ username: req.session.volunteer_id.username })
  res.render('volunteer/volunteer_extra_view', { volunteerroute: true, volunteer_details, data });
});


router.get('/logout',auth,async function(req, res, next) {
  req.session.volunteer_id=null
  res.redirect('/');
});


module.exports = router;