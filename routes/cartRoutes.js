// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateProductId } = require('../middleware/validation');

// Route to get the current user's cart
router.get('/', authenticate, cartController.getUserCart);

// Route to add a product to the cart
router.post('/', authenticate, cartController.addToCart);

// Route to remove a product from the cart
router.delete('/:productId', validateProductId, authenticate, cartController.removeFromCart);

module.exports = router;
