// models/cartModel.js

const db = require('../config/db');

// Fetch the user's cart
const fetchUserCart = async (userEmail) => {
    const query = `
        SELECT 
            c.user_email,
            c.product_id,
            c.quantity,
            p.name AS product_name,
            p.price AS product_price
        FROM 
            public.cart c
        LEFT JOIN 
            public.products p ON c.product_id = p.id
        WHERE 
            c.user_email = $1;
    `;
    const { rows } = await db.query(query, [userEmail]);
    return rows;
};

// Add a product to the cart
const addProductToCart = async (userEmail, productId, quantity) => {
    const query = `
        INSERT INTO public.cart (user_email, product_id, quantity)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_email, product_id) 
        DO UPDATE SET quantity = cart.quantity + $3;  -- Update quantity if product already exists
    `;
    await db.query(query, [userEmail, productId, quantity]);
    return fetchUserCart(userEmail);  // Return the updated cart
};

// Remove a product from the cart
const removeProductFromCart = async (userEmail, productId) => {
    const query = `
        DELETE FROM public.cart
        WHERE user_email = $1 AND product_id = $2
        RETURNING *;
    `;
    const result = await db.query(query, [userEmail, productId]);
    return result;
};

// Additional methods for cart can be added here as needed

module.exports = {
    fetchUserCart,
    addProductToCart,
    removeProductFromCart,
};
