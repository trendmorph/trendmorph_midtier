// services/authService.js
const authModel = require('../models/authModel');
const { sendOtpToEmail, verifyOtp } = require('../utils/otpUtil');

const register = async (email, role) => {
    return await authModel.addUser(email, role);
};

const requestOtp = async (email) => {
    return await sendOtpToEmail(email);
};

const verifyOtpLogin = async (body) => {
    const { email, otp } = body;
    const message = await verifyOtp(email, otp);

    const role = await authModel.isAnAdmin(email) ? 'ADMIN' : 'USER'; // Example logic for assigning role
    register(email, role);

    return message;
};

module.exports = {
    requestOtp,
    verifyOtpLogin
};
