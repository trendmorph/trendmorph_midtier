// middlewares/validation.js

// Middleware to validate Product ID
const validateProductId = (req, res, next) => {
    const id = parseInt(req.params.productId, 10);
    if (isNaN(id) || id < 1) {
        return res.status(400).json({ error: 'Invalid product ID. Must be a positive integer.' });
    }
    next();
};

// Middleware to validate Order ID
const validateOrderId = (req, res, next) => {
    const id = parseInt(req.params.orderId, 10);
    if (isNaN(id) || id < 1) {
        return res.status(400).json({ error: 'Invalid order ID. Must be a positive integer.' });
    }
    next();
};

// Middleware to validate email while login
const validateEmail = (req, res, next) => {
    console.log(req)
    const { email } = req.body;

    // Check if email exists
    if (!email) {
        return res.status(400).json({ error: 'Email is a required field.' });
    }

    // Check if email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // If validation passes, move to the next middleware/controller
    next();
};

// TODO: More validation functions can be added here as needed

module.exports = {
    validateProductId,
    validateEmail,
    validateOrderId
    // export other validation functions here
};
