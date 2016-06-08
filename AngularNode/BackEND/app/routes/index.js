var express = require('express');
var router = express.Router();
//var CommonCtrl = new (require('../controllers/common')).CommonCtrl();
//var CampaignCtrl = new (require('../controllers/campaign')).Campaign();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
