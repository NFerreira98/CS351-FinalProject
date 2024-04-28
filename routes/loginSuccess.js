var express = require('express');
const { checkLogin } = require("../controllers/database");
var router = express.Router();

// Handle POST request for user login
router.post('/', async function(req, res, next) {
    const { username, password } = req.body;

    try {
        // Check user login
        const user = await checkLogin(username, password);

        if (user) {
            // If login is successful, render the login success view
            res.render('loginSuccess', { title: 'Login Success', user });
        } else {
            // If login fails, go back to account login page
            res.redirect("https://csweb01.csueastbay.edu/~bo5237/Project1/account.html")        }
    } catch (error) {
        console.error('Error logging in:', error);
        // Render an error page if something goes wrong
        res.render('error', { title: 'Error', errorMessage: 'An error occurred while logging in.' });
    }
});

module.exports = router;
