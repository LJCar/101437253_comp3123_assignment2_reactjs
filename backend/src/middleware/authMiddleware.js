const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'COMP3123_secret_key';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        console.error('Verification failed', err.message);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;