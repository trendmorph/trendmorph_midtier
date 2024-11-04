// services/wishlistService.js
const Wishlist = require('../models/wishListModel');

class WishlistService {
    // Fetch user's wishlist based on userEmail (assumed to be email here)
    async fetchUserWishlist(userEmail) {
        try {
            // Assume the Wishlist model has a method like `findOne` to get the wishlist
            const wishlist = await Wishlist.fetchUserWishlist(userEmail);
            return wishlist || { items: [] }; // return empty wishlist if not found
        } catch (error) {
            console.error("Error fetching user wishlist:", error);
            throw new Error("Could not fetch user wishlist.");
        }
    }

    // Add product to user's wishlist
    async addProductToWishlist(userEmail, productId) {

        try {
            // Find the user's wishlist or create a new one if it doesn't exist
            let wishlist = await Wishlist.addProductToWishlist(userEmail, productId);
            if (!wishlist) {
                wishlist = new Wishlist({ userEmail, items: [] });
            }
            return wishlist;
        } catch (error) {
            console.error("Error adding product to wishlist:", error);
            throw new Error("Could not add product to wishlist.");
        }
    }

    // Remove product from user's wishlist
    async removeProductFromWishlist(userEmail, productId) {
        try {
            // Find the user's wishlist
            const wishlist = await Wishlist.removeProductFromWishlist(userEmail, productId);
            // Check if any row was affected
            if (wishlist.rowCount === 0) throw new Error("Product not found in wishlist.");
    
            return { message: "Product removed successfully." };
        } catch (error) {
            console.error("Error removing product from wishlist:", error);
            throw new Error("Could not remove product from wishlist.");
        }
    }
}

// Export an instance of WishlistService
module.exports = new WishlistService();
