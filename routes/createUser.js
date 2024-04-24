const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { storeUser } = require('../controllers/database');

// Validation  functions
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


// Route for user registration
router.post('/register', [
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirmPassword
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, call the storeUser function from the database controller
    try {
        await storeUser(req.body);
        res.send('User registration successful');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('An error occurred during user registration');
    }
});

module.exports = router;
