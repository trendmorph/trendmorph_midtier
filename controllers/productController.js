const productService = require('../services/productService');

// Handler to get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.fetchAllProducts();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error. Please try again later.' });
    }
};

// Handler to get a specific product by ID
const getProductById = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const product = await productService.fetchProduct(id);
        if (!product) {
            return res.status(404).json({ success: false, error: `No product found with ID ${id}` });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error. Please try again later.' });
    }
};

// const updateProduct = async (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     if (isNaN(id)) return res.status(400).json({ error: 'Invalid product ID' });

//     try {
//         await productService.modifyProduct(id, req.body);
//         res.status(200).json({ message: 'Product updated successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(404).json({ error: error.message });
//     }
// };

// const deleteProduct = async (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     if (isNaN(id)) return res.status(400).json({ error: 'Invalid product ID' });

//     try {
//         await productService.removeProduct(id);
//         res.status(200).json({ message: 'Product deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(404).json({ error: error.message });
//     }
// };

// const addProducts = async (req, res) => {
//     try {
//         await productService.createProducts(req.body.products);
//         res.status(201).json({ message: 'Products added successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// };

module.exports = {
    getAllProducts,
    getProductById,
    // updateProduct,
    // deleteProduct,
    // addProducts,
};
