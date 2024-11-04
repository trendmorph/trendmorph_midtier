// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// User profile routes
router.get('/profile', authenticate, userController.getCurrentUserProfile); // Get current user profile information
router.put('/profile', authenticate, userController.updateCurrentUserProfile); // Update current user profile information

module.exports = router;
