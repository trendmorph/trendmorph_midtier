// services/userService.js
const userModel = require('../models/userModel');

const getUserProfile = async (email) => {
    return await userModel.currentUser(email);
};

const updateUserProfile = async (email, updates) => {
    return await userModel.updateUser(email, updates);
};

const fetchCurrentUser = async (email) => {
    return await userModel.currentUser(email);
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    fetchCurrentUser
};
