var express = require('express');
const {addItemToCart} = require("../controllers/database");
var router = express.Router();

/* GET addToCart listing. */
router.get('/', addItemToCart);

module.exports = router;