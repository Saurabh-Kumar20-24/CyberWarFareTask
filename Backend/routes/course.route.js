import express from 'express';
import { getAllCourses,courseById } from '../Controller/course.controller.js';
import { Authenticated } from '../middleware/auth.js';
const router = express.Router();

router.get('/',Authenticated, getAllCourses);
router.get('/:id',Authenticated,courseById);

export default router;