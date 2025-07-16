import db from '../models/index.js';

/**
 * @swagger
 * tags:
 *   - name: Courses
 *     description: Course management
 */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, TeacherId]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               TeacherId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Course created
 */
export const createCourse = async (req, res) => {
    try {
        const course = await db.Course.create(req.body);
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of courses
 */
export const getAllCourses = async (req, res) => {

    // take certain amount at a time
    const limit = parseInt(req.query.limit) || 10;
    // which page to take
    const page = parseInt(req.query.page) || 1;

    const total = await db.Course.count();

    //Sorting
    const sortOrder = req.query.sort === 'desc' ? 'DESC' : 'ASC';

    const include = [];
    if (req.query.populate === 'teacherId'){
        include.push(db.Teacher);
    }
    if (req.query.populate === 'students'){
        include.push(db.Student);
    }
    try {
        const {count, rows} = await db.Course.findAndCountAll(
            {
                limit,
                offset,
                order: [['createdAt', sortOrder]],
                include
            }
        );

        res.json({
            meta: {
                totalItems: count,
                page: page,
                totalPages: Math.ceil(count / limit),
            },
            data: rows,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Course found
 *       404:
 *         description: Not found
 */
export const getCourseById = async (req, res) => {
    try {
        const include = [];
        if (req.query.populate === 'teacherId') {
            include.push(db.Teacher);
        }
        if (req.query.populate === 'students') {
            include.push(db.Student);
        }
        const course = await db.Course.findByPk(req.params.id, { include });
        if (!course) return res.status(404).json({ message: 'Not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object }
 *     responses:
 *       200:
 *         description: Course updated
 */
export const updateCourse = async (req, res) => {
    try {
        const course = await db.Course.findByPk(req.params.id);
        if (!course) return res.status(404).json({ message: 'Not found' });
        await course.update(req.body);
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Course deleted
 */
export const deleteCourse = async (req, res) => {
    try {
        const course = await db.Course.findByPk(req.params.id);
        if (!course) return res.status(404).json({ message: 'Not found' });
        await course.destroy();
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
