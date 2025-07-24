const express = require('express');
const authController = require('../controllers/authController'); // Import controller
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// User Registration
router.post('/register', authController.register);

// User Login
router.post('/login', authController.login);

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = jwt.sign(
    { userId: req.user._id, username: req.user.username, email: req.user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  // Redirect to frontend with token as query param
  res.redirect(`http://localhost:3000/login?token=${token}`);
});

module.exports = router;
