var express = require('express');
var router = express.Router();

//########################################

const { getorders } = require('../controllers/database');
const path = require("path");

router.get('/', getorders)

module.exports = router;