// controllers/userController.js
const userService = require('../services/userService');

// userController.js
const getCurrentUserProfile = async (req, res) => {
    console.log(req.user)
    try {
        const userProfile = await userService.getUserProfile(req.user.email); // `req.user.email` is populated by middleware
        res.status(200).json({ userProfile });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

const updateCurrentUserProfile = async (req, res) => {
    try {
        const userProfile = await userService.updateUserProfile(req.user.email, req.body);
        res.status(200).json({ message: 'Profile updated successfully', userProfile });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getCurrentUserProfile,
    updateCurrentUserProfile
};
