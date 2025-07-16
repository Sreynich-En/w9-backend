import jwt from 'jsonwebtoken';
import db from '../models/index.js';

/**
 * JWT Middleware to validate JWT tokens
 * Extracts token from Authorization header
 * Verifies token using secret key
 * Rejects unauthorized or invalid requests
 */
export const authenticateToken = async (req, res, next) => {
    try {
        // Extract token from Authorization header (Bearer TOKEN)
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        // Check if token is provided
        if (!token) {
            return res.status(401).json({ 
                message: 'Access token required',
                error: 'Authorization header with Bearer token is required'
            });
        }

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
        
        // Additional security: verify user still exists in database
        const user = await db.User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid token',
                error: 'User associated with token no longer exists'
            });
        }

        // Attach user info to request object for use in protected routes
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            name: user.name
        };
        
        next(); // Continue to the protected route
    } catch (err) {
        // Handle different JWT errors
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ 
                message: 'Token expired',
                error: 'Please login again'
            });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ 
                message: 'Invalid token',
                error: 'Token is malformed or invalid'
            });
        } else {
            return res.status(500).json({ 
                message: 'Token verification failed',
                error: err.message
            });
        }
    }
};