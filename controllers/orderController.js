// controllers/orderController.js

const orderService = require('../services/orderService');

// Place a new order
const placeOrder = async (req, res) => {
    const userEmail = req.user.email; // assuming you have user info in req.user

    try {
        const orderData = req.body; // assuming order data is sent in the request body
        const newOrder = await orderService.createOrder(orderData, userEmail);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get details of a specific order by ID
const getOrderById = async (req, res) => {
    const userEmail = req.user.email; // assuming you have user info in req.user
    const orderId = req.params.orderId;
    try {
        const order = await orderService.fetchOrderByID(orderId, userEmail);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Fetch list of past orders for the current user
const getUserOrders = async (req, res) => {
    const userEmail = req.user.email; // assuming you have user info in req.user
    try {
        const orders = await orderService.fetchOrdersByEmail(userEmail);
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    placeOrder,
    getOrderById,
    getUserOrders,
};
