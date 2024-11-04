// routes/wishlistRoutes.js

const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateProductId } = require('../middleware/validation');

// Route to get the current user's wishlist
router.get('/', authenticate, wishlistController.getUserWishlist);

// Route to add a product to the wishlist
router.post('/', authenticate, wishlistController.addToWishlist);

// Route to remove a product from the wishlist
router.delete('/:productId', validateProductId, authenticate, wishlistController.removeFromWishlist);

module.exports = router;
