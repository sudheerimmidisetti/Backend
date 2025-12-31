import express from "express";
const router = express.Router();
import {
  getStudentsDetails,
  addStudents,
  getStudentById,
  getStudentsDetailsWithFilters,
  updateStudents,
  UpdateStudentsStatus,
  deleteStudentById,
  deleteStudentById2,
  deleteStudentMany,
} from "../controllers/studentsController.js";

router.get("/get-students", getStudentsDetails);
router.post("/add-students", addStudents);
router.get("/get-student-byid/:userid", getStudentById); //params single
router.get("/get-std-details-withfilter", getStudentsDetailsWithFilters); //query parameters
router.put("/put-students/:id", updateStudents); //put method
router.put("/update-students-status", UpdateStudentsStatus); //put method to update multiple documents
router.delete("/delete-student-byid/:userid", deleteStudentById); //delete method
router.delete("/delete-student-byid2/:userid", deleteStudentById2); //delete method using findByIdAndDelete
router.delete("/delete-student-many", deleteStudentMany); //delete method to delete multiple documents

export default router;
