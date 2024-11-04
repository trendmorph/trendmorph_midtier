// controllers/wishlistController.js

const wishlistService = require('../services/wishlistService');

// Get the current user's wishlist
const getUserWishlist = async (req, res) => {
    const userEmail = req.user.email; // assuming you have user info in req.user
    try {
        const wishlist = await wishlistService.fetchUserWishlist(userEmail);
        res.status(200).json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Add a product to the wishlist
const addToWishlist = async (req, res) => {
    const userEmail = req.user.email; // assuming you have user info in req.user
    const { productId } = req.body; // assuming productId is sent in the request body

    try {
        const updatedWishlist = await wishlistService.addProductToWishlist(userEmail, productId);
        res.status(200).json(updatedWishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Remove a product from the wishlist
const removeFromWishlist = async (req, res) => {
    const userEmail = req.user.email; // assuming you have user info in req.user
    const productId = req.params.productId;

    try {
        await wishlistService.removeProductFromWishlist(userEmail, productId);
        res.status(204).send(); // No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUserWishlist,
    addToWishlist,
    removeFromWishlist,
};
