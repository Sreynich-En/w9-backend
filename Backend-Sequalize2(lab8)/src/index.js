import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/student.routes.js';
import courseRoutes from './routes/course.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import { serveSwagger, setupSwagger } from './config/swagger.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// CORS configuration for frontend
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Add your frontend URLs
    credentials: true
}));

app.use(express.json());

app.use('/docs', serveSwagger, setupSwagger);

app.use('/auth', authRoutes);
// Direct routes for frontend compatibility
app.use('/', authRoutes);
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
app.use('/teachers', teacherRoutes);
app.use('/users', userRoutes); // Protected users routes

// Additional auth-prefixed routes for frontend compatibility
app.use('/auth/students', studentRoutes);
app.use('/auth/teachers', teacherRoutes);
app.use('/auth/courses', courseRoutes);
app.use('/auth/users', userRoutes);

app.get('/', (req, res) => res.send('Welcome to School API!'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
