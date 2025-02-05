const express = require('express');
const authController = require('../controllers/authController'); // Import controller
const router = express.Router();

// User Registration
router.post('/register', authController.register);

// User Login
router.post('/login', authController.login);

module.exports = router;
