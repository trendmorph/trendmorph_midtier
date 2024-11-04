// controllers/authController.js
const jwt = require('jsonwebtoken')
const authService = require('../services/authService');
const { generateJWT } = require('../middleware/authMiddleware');

const loginUser = async (req, res) => {
    try {
        await authService.requestOtp(req.body.email);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const logoutUser = async (req, res) => {
    res.status(200).json({ message: 'User logged out successfully' });
};

const verifyOtpLogin = async (req, res) => {
    try {
        const message = await authService.verifyOtpLogin(req.body);

        // Generate a JWT token upon successful OTP validation
        const token = generateJWT(req.body.email)
        
        res.status(200).json({ message, token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    loginUser,
    logoutUser,
    verifyOtpLogin
};
