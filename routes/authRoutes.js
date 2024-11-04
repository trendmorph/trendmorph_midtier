// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const { validateEmail } = require('../middleware/validation');

const router = express.Router();

// Authentication routes
// router.post('/register', authController.registerUser); // Register a new user
router.post('/login', validateEmail, authController.loginUser); // Log in a user
router.post('/logout', authController.logoutUser); // Log out the user

// OTP routes
// router.post('/send-otp', authController.sendOtpToEmail); // Send OTP
router.post('/verify-otp', authController.verifyOtpLogin); // Verify OTP

module.exports = router;
