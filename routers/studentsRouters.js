// import express from "express";
const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentsController.js");
// import {
//   getStudentsDetails,
//   addStudents,
//   getStudentById,
//   getStudentsDetailsWithFilters,
//   updateStudents,
//   UpdateStudentsStatus,
//   deleteStudentById,
//   deleteStudentById2,
//   deleteStudentMany,
//   UploadFile,
//   GenerateToken,
//   Encryption,
//   Verifyencrypt
// } from "../controllers/studentsController.js";

// /Image upload requires variables
const multer = require("multer");
const path = require("path");

const JWT = require("jsonwebtoken");

const Bcrypt = require("bcrypt");

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

router.get("/get-students", studentController.getStudentsDetails);
router.post("/add-students", studentController.addStudents);
router.get("/get-student-byid/:userid", studentController.getStudentById); //params single
router.get(
  "/get-std-details-withfilter",
  studentController.getStudentsDetailsWithFilters,
); //query parameters
router.put("/put-students/:id", studentController.updateStudents); //put method
router.put("/update-students-status", studentController.UpdateStudentsStatus); //put method to update multiple documents
router.delete(
  "/delete-student-byid/:userid",
  studentController.deleteStudentById,
); //delete method
router.delete(
  "/delete-student-byid2/:userid",
  studentController.deleteStudentById2,
); //delete method using findByIdAndDelete
router.delete("/delete-student-many", studentController.deleteStudentMany); //delete method to delete multiple documents

router.post(
  "/file-upload",
  Upload.array("file", 3),
  studentController.UploadFile,
);

// Middleware VerifyFunction
router.get(
  "/send-mail",
  async (req, res, next) => {
    try {
      const decoded = JWT.verify(req.cookies.token, "!@#CCAfdv678678");
      console.log(decoded);
      next();
    } catch (err) {
      return res.status(400).json("Token Expired");
    }
  },
  studentController.SendMail,
);

router.post("/encrypt-token", studentController.Encryption);
router.post("/verify-token", studentController.Verifyencrypt);

module.exports = router;
