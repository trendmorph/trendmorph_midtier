const db = require('../config/db');

const getAllProducts = async () => {
    const { rows } = await db.query('SELECT * FROM public."products"');
    return rows;
};

const getProductById = async (id) => {
    const { rows } = await db.query('SELECT * FROM public."products" WHERE id = $1', [id]);
    return rows[0];
};

const updateProductById = async (id, productData) => {
    const updateQuery = `
        UPDATE public."products" 
        SET name = $1, category = $2, sub_category = $3, price = $4, quantity = $5, available_sizes = $6, available_colors = $7 
        WHERE id = $8
    `;
    const values = [...Object.values(productData), id];
    const { rowCount } = await db.query(updateQuery, values);
    return rowCount > 0;
};

const deleteProductById = async (id) => {
    const { rowCount } = await db.query('DELETE FROM public."products" WHERE id = $1', [id]);
    return rowCount > 0;
};

const addProducts = async (products) => {
    const insertQuery = `
        INSERT INTO public."products" (name, category, sub_category, price, quantity, available_sizes, available_colors) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const promises = products.map(product => db.query(insertQuery, Object.values(product)));
    await Promise.all(promises);
};

module.exports = {
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    addProducts,
};
