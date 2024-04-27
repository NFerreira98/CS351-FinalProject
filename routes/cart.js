var express = require('express');
var router = express.Router();

const{ checkOut } = require('../controllers/database')
const path = require("path");

router.get('/',checkOut)




module.exports = router;
