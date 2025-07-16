import { authenticateToken } from '../middleware/auth.middleware.js';

// In your route file
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});