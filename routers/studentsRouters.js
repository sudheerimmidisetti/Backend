import express from 'express';
const router = express.Router();
import { getStudentsDetails, addStudents, getStudentById, getStudentsDetailsWithFilters, updateStudents } from '../controllers/studentsController.js';

router.get('/get-students', getStudentsDetails);
router.post('/add-students', addStudents);
router.get('/get-student-byid/:userid', getStudentById); //params single
router.get('/get-std-details-withfilter', getStudentsDetailsWithFilters); //query parameters
router.put('/put-students/:id', updateStudents); //put method

export default router;