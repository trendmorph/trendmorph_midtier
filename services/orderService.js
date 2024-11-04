const orderModel = require('../models/orderModel');

const fetchOrdersByEmail = async (email) => {
    const orders = await orderModel.fetchOrdersByEmail(email);
    if (!orders.length) throw new Error('No Orders found');
    return orders;
};

const fetchOrderByID = async (id, email) => {
    const order = await orderModel.fetchOrderByID(id, email);
    if (!order) throw new Error('order not found');
    return order;
};

const createOrder = async (order, userEmail) => {
    try {
        const result = await orderModel.createOrder(order, userEmail);
        console.log(`Order created successfully with Order ID: ${result.orderId}`);
        return {
            message: 'Order placed successfully',
            orderId: result.orderId,
        };
    } catch (error) {
        console.error('Error placing order:', error);
        throw new Error('Failed to place order');
    }
};

module.exports = {
    fetchOrdersByEmail,
    fetchOrderByID,
    // modifyProduct,
    // removeProduct,
    createOrder,
};
