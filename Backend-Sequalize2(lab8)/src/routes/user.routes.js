import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import db from '../models/index.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints (JWT authentication required)
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Protected - JWT Required)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Users retrieved successfully"
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 requestedBy:
 *                   type: string
 *                   example: "john@example.com"
 *       401:
 *         description: Unauthorized - JWT token required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Protected route - Only allow access if JWT is valid
router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await db.User.findAll({
            attributes: ['id', 'name', 'email', 'createdAt'] // Exclude password
        });
        
        res.json({
            message: 'Users retrieved successfully',
            users,
            requestedBy: req.user.email // Available from JWT middleware
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get current user profile (Protected - JWT Required)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile retrieved successfully"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - JWT token required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Protected route - Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await db.User.findByPk(req.user.userId, {
            attributes: ['id', 'name', 'email', 'createdAt']
        });
        
        res.json({
            message: 'Profile retrieved successfully',
            user
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID (Protected - JWT Required)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to get
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User retrieved successfully"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - JWT token required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
// Protected route - Get user by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id, {
            attributes: ['id', 'name', 'email', 'createdAt']
        });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            message: 'User retrieved successfully',
            user
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
