// services/cartService.js
const Cart = require('../models/cartModel');

class CartService {
    // Fetch user's cart based on userEmail (assumed to be email here)
    async fetchUserCart(userEmail) {
        try {
            // Assume the Cart model has a method like `findOne` to get the cart
            const cart = await Cart.fetchUserCart( userEmail );
            return cart || { items: [] }; // return empty cart if not found
        } catch (error) {
            console.error("Error fetching user cart:", error);
            throw new Error("Could not fetch user cart.");
        }
    }

    // Add product to user's cart
    async addProductToCart(userEmail, productId, quantity) {
        try {
            // Find the user's cart or create a new one if it doesn't exist
            let cart = await Cart.addProductToCart(userEmail, productId, quantity);
            if (!cart) {
                cart = new Cart({ userEmail, items: [] });
            }

            // Check if the product is already in the cart
            // const productIndex = cart.items.findIndex(item => item.productId === productId);
            // if (productIndex !== -1) {
            //     // Update the quantity if product already exists in the cart
            //     cart.items[productIndex].quantity += quantity;
            // } else {
            //     // Add the new product to the cart
            //     cart.items.push({ productId, quantity });
            // }

            // // Save the cart with updated items
            // await cart.save();
            return cart;
        } catch (error) {
            console.error("Error adding product to cart:", error);
            throw new Error("Could not add product to cart.");
        }
    }

    // Remove product from user's cart
    async removeProductFromCart(userEmail, productId) {
        try {
            // Attempt to remove the product from the user's cart
            const deleteResult = await Cart.removeProductFromCart(userEmail, productId);
    
            // Check if any row was affected
            if (deleteResult.rowCount === 0) throw new Error("Product not found in cart.");
    
            
            return { message: "Product removed successfully." };
        } catch (error) {
            console.error("Error removing product from cart:", error);
            throw new Error("Could not remove product from cart.");
        }
    }
    
}

// Export an instance of CartService
module.exports = new CartService();
