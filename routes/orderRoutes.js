// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { validateOrderId } = require('../middleware/validation');
const { authenticate } = require('../middleware/authMiddleware');

// Route to place a new order
// TODO: This has to be implemented
router.post('/', authenticate, orderController.placeOrder);

// Route to get details of a specific order by ID
router.get('/:orderId', validateOrderId, authenticate, orderController.getOrderById);

// Route to fetch list of past orders for the current user
router.get('/', authenticate, orderController.getUserOrders);

module.exports = router;
