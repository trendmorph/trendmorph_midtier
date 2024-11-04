// controllers/cartController.js

const cartService = require('../services/cartService');

// Get the current user's cart
const getUserCart = async (req, res) => {
    const userEmail = req.user.email; // assuming you have user info in req.user
    try {
        const cart = await cartService.fetchUserCart(userEmail);
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Add a product to the cart
const addToCart = async (req, res) => {
    const userEmail = req.user.email; // assuming you have user info in req.user
    const { productId, quantity } = req.body; // assuming productId and quantity are sent in the request body

    try {
        const updatedCart = await cartService.addProductToCart(userEmail, productId, quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Remove a product from the cart
const removeFromCart = async (req, res) => {
    const userEmail = req.user.email; // assuming you have user info in req.user
    const productId = req.params.productId;

    try {
        await cartService.removeProductFromCart(userEmail, productId);
        res.status(204).send(); // No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUserCart,
    addToCart,
    removeFromCart,
};
