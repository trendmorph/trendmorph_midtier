// models/wishlistModel.js

const db = require('../config/db');

// Fetch the user's wishlist
const fetchUserWishlist = async (userEmail) => {
    const query = `
        SELECT 
            w.user_email,
            w.product_id,
            p.name AS product_name,
            p.price AS product_price
        FROM 
            public.wishlist w
        LEFT JOIN 
            public.products p ON w.product_id = p.id
        WHERE 
            w.user_email = $1;
    `;
    const { rows } = await db.query(query, [userEmail]);
    return rows;
};

// Add a product to the wishlist
const addProductToWishlist = async (userEmail, productId) => {
    const query = `
        INSERT INTO public.wishlist (user_email, product_id)
        VALUES ($1, $2)
        ON CONFLICT (user_email, product_id) 
        DO NOTHING;
    `;
    await db.query(query, [userEmail, productId]);
    return fetchUserWishlist(userEmail);  // Return the updated wishlist
};

// Remove a product from the wishlist
const removeProductFromWishlist = async (userEmail, productId) => {
    const query = `
        DELETE FROM public.wishlist
        WHERE user_email = $1 AND product_id = $2
        RETURNING *;
    `;
    const result = await db.query(query, [userEmail, productId]);
    return result;
};

// Additional methods for wishlist can be added here as needed

module.exports = {
    fetchUserWishlist,
    addProductToWishlist,
    removeProductFromWishlist,
};
