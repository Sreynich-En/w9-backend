import express from 'express';
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} from '../controllers/course.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes - require authentication
router.get('/', authenticateToken, getAllCourses);
router.get('/:id', authenticateToken, getCourseById);
router.post('/', authenticateToken, createCourse);
router.put('/:id', authenticateToken, updateCourse);
router.delete('/:id', authenticateToken, deleteCourse);

export default router;
