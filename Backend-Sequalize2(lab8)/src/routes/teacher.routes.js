import express from 'express';
import {
    createTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
} from '../controllers/teacher.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes - require authentication
router.get('/', authenticateToken, getAllTeachers);
router.get('/:id', authenticateToken, getTeacherById);
router.post('/', authenticateToken, createTeacher);
router.put('/:id', authenticateToken, updateTeacher);
router.delete('/:id', authenticateToken, deleteTeacher);

export default router;
