// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProductId } = require('../middleware/validation');

// Route to get all products
router.get('/', productController.getAllProducts);

// Route to get a product by ID with validation middleware
router.get('/:productId', validateProductId, productController.getProductById);

module.exports = router;
