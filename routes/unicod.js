var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('unicod/unicod_home',{unicodroute:true});
});

module.exports = router;