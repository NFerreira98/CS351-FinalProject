var express = require('express');
var router = express.Router();

//Necessary for server-side validation
const { body, validationResult } = require('express-validator');


//to process data sent in on request need body-parser module
var bodyParser = require('body-parser');
var path = require('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value

router.use(bodyParser.json()); // for parsing application/jsona
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Server-side validation
const validateUsername = body('username').isLength({ min: 4 }).withMessage('Username must be at least 4 characters long');
const validateEmail = body('email').isEmail().withMessage('Invalid email address');
const validatePassword = body('password').isLength({ min: 7 }).withMessage('Password must be at least 7 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number');
const validateConfirmPassword = body('confirm-password').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Passwords do not match');
    }
    return true;
});

/* GET createAccount page. */
router.get('/', function(req, res, next) {
    res.redirect('https://csweb01.csueastbay.edu/~bo5237/Project1/createAccount.html');
});

var controllerDatabase = require('../controllers/database');
router.post("/", [
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirmPassword
], controllerDatabase.saveNewCustomer);

module.exports = router;
