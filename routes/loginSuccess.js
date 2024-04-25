var express = require('express');
const {getAccount} = require("../controllers/database");
var router = express.Router();

router.get('/',getAccount)




module.exports = router;