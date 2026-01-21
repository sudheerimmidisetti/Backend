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

// /Image upload requires variables
const multer = require("multer");
const path = require("path");

// Image Upload required functions
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const FileFilters = (req, file, cb) => {
  const AllowedTypes = /png|jpg|jpeg|svg/;
  const extension = path.extname(file.originalname).toLowerCase();
  if (AllowedTypes.test(extension)) {
    cb(null, true);
  } else {
    cb(new Error("Not Valid Formate"));
  }
};

const Upload = multer({
  storage: Storage,
  fileFilter: FileFilters,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

route.post("/file-upload", Upload.array("file", 3), FirstController.UploadFile);

// Middleware VerifyFunction
route.get('/send-mail',
    async(req,res,next)=>{
        try{
            const decoded = JWT.verify(req.cookies.token,"!@#CCAfdv678678")
            console.log(decoded)
            next();
        }
        catch(err){
            return res.status(400).json("Token Expired")
        }
    },
FirstController.SendMail);

export default router;