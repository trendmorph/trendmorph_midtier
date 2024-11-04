const db = require('../config/db');

const fetchOrdersByEmail = async (email) => {
    console.log('email: ',email)
    const query = `
        SELECT 
            o.id AS order_id,
            o.user_email,
            o.delivery_address,
            o.order_amount,
            o.order_date,
            oi.product_id,
            oi.quantity,
            p.name AS product_name,
            p.price AS product_price
        FROM 
            public."orders" o
        LEFT JOIN 
            public."order_items" oi 
        ON 
            o.id = oi.order_id
        LEFT JOIN 
            public."products" p
        ON 
            oi.product_id = p.id
        WHERE 
            o.user_email = $1;
    `;
    const { rows } = await db.query(query, [email]);
    return rows;
};



const fetchOrderByID = async (id, email) => {
    const query = `
        SELECT 
            o.id AS order_id,
            o.user_email,
            o.delivery_address,
            o.order_amount,
            o.order_date,
            oi.product_id,
            oi.quantity,
            p.name AS product_name,
            p.price AS product_price
        FROM 
            public."orders" o
        LEFT JOIN 
            public."order_items" oi 
        ON 
            o.id = oi.order_id
        LEFT JOIN 
            public."products" p
        ON 
            oi.product_id = p.id
        WHERE 
            o.id = $1 AND o.user_email = $2;
    `;
    const { rows } = await db.query(query, [id, email]);
    return rows;
};


// const updateProductById = async (id, productData) => {
//     const updateQuery = `
//         UPDATE public."products" 
//         SET name = $1, category = $2, sub_category = $3, price = $4, quantity = $5, available_sizes = $6, available_colors = $7 
//         WHERE id = $8
//     `;
//     const values = [...Object.values(productData), id];
//     const { rowCount } = await db.query(updateQuery, values);
//     return rowCount > 0;
// };

// const deleteProductById = async (id) => {
//     const { rowCount } = await db.query('DELETE FROM public."products" WHERE id = $1', [id]);
//     return rowCount > 0;
// };

const createOrder = async (order, user_email) => {
    // const client = await db.connect();  // Get a client connection for transaction
    try {
        await db.query('BEGIN');  // Start the transaction

        // Insert into the 'orders' table
        const insertOrderQuery = `
            INSERT INTO public."orders" (user_email, delivery_address, order_amount, order_date)
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
            RETURNING id;  -- Get the generated order ID
        `;
        const orderValues = [user_email, order.delivery_address, order.order_amount];
        const { rows } = await db.query(insertOrderQuery, orderValues);
        const orderId = rows[0].id;  // Get the newly created order ID

        // Insert each product into the 'order_items' table
        const insertOrderItemsQuery = `
            INSERT INTO public."order_items" (order_id, product_id, quantity)
            VALUES ($1, $2, $3);
        `;

        // Loop through products and insert them
        for (const product of order.products) {
            const orderItemValues = [orderId, product.product_id, product.quantity];
            await db.query(insertOrderItemsQuery, orderItemValues);
        }

        await db.query('COMMIT');  // Commit the transaction

        return { orderId };  // Return the created order ID
    } catch (error) {
        await db.query('ROLLBACK');  // Rollback the transaction in case of an error
        throw error;
    } finally {
        // db.release();  // Release the client back to the pool
    }
};

module.exports = {
    fetchOrdersByEmail,
    fetchOrderByID,
    // updateProductById,
    // deleteProductById,
    createOrder,
};

