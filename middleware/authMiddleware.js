// authMiddleware.js
const jwt = require('jsonwebtoken');

const generateJWT = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expected format: 'Bearer <token>'
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded email to req.user
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

module.exports = {authenticate, generateJWT};
