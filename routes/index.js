var express = require('express');
var router = express.Router();

//########################################
//to process data sent in on request need body-parser module
var bodyParser = require('body-parser');
var path = require('path'); //to work with separators on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value

router.use(bodyParser.json()); // for parsing application/json

router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//#########################################

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GuardGear' });
});

var controllerDatabase = require('../controllers/database');   //this will load the controller files below
router.post("/addItemToCart", controllerDatabase.addItemToCart); //see controllers/database.js file
router.post("/getOrderSummary", controllerDatabase.getOrderSummary);
router.post("/storeOrder", controllerDatabase.storeOrder);

module.exports = router;
