var express = require('express');
var router = express.Router();

//########################################

const { getOrderSummary } = require('../controllers/database');
const path = require("path");

router.get('/', getOrderSummary)

module.exports = router;