var express = require('express');
var router = express.Router();

//########################################

const { getCustomers } = require('../controllers/database');
const path = require("path");

router.get('/', getCustomers)

module.exports = router;