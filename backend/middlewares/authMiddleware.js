const jwt = require('jsonwebtoken');

// Middleware to check if the request contains a valid JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;  // Store user information in the request object
        next();  // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
