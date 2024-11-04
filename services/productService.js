const productModel = require('../models/productModel');

const fetchAllProducts = async () => {
    const products = await productModel.getAllProducts();
    if (!products.length) throw new Error('No products found');
    return products;
};

const fetchProduct = async (id) => {
    const product = await productModel.getProductById(id);
    if (!product) throw new Error('Product not found');
    return product;
};

const modifyProduct = async (id, productData) => {
    const updated = await productModel.updateProductById(id, productData);
    if (!updated) throw new Error('Product not found');
};

const removeProduct = async (id) => {
    const deleted = await productModel.deleteProductById(id);
    if (!deleted) throw new Error('Product not found');
};

const createProducts = async (products) => {
    await productModel.addProducts(products);
};

module.exports = {
    fetchAllProducts,
    fetchProduct,
    modifyProduct,
    removeProduct,
    createProducts,
};
