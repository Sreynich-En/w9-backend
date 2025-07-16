import express from 'express';
import {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} from '../controllers/student.controller.js';

import { authenticateToken } from '../middleware/auth.middleware.js';

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management endpoints (JWT authentication required)
 */

const router = express.Router();

// Protected routes - require authentication
router.get('/', authenticateToken, getAllStudents);
router.get('/:id', authenticateToken, getStudentById);
router.post('/', authenticateToken, createStudent);
router.put('/:id', authenticateToken, updateStudent);
router.delete('/:id', authenticateToken, deleteStudent);

export default router;
