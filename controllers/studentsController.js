// import student from "../models/studentsModels.js";
const student = require("../models/studentsModels.js");

// Send Mail
const nodemailer = require("nodemailer");

// Token GenerateFunction
const JWT = require("jsonwebtoken");

// Bcrypt
const bcrypt = require("bcrypt")

// Used to shedule
const cron = require("node-cron");

const getStudentsDetails = async (req, res) => {
  try {
    const mydata = await student.find();
    res.status(200).json(mydata);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const addStudents = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    // const addeddata = await student.create(data);
    const addeddata = await student.insertMany(data);
    console.log(addeddata);
    res.status(201).json("data added");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const id = req.params.userid;
    console.log("id :", id);
    const data = await student.findById({ _id: id });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStudents = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedData = await student.findOneAndUpdate({ stdRoll: id }, data, {
      new: true,
    });

    if (!updatedData) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student data updated successfully",
      student: updatedData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpdateStudentsStatus = async (req, res) => {
  try {
    await student.updateMany({ status: false }, { $set: { status: true } });
    res
      .status(200)
      .json({ message: "All inactive students have been updated to active." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStudentById = async (req, res) => {
  try {
    const id = req.params.userid;
    const deletedData = await student.findOneAndDelete({ stdRoll: id });
    res.status(200).json(deletedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStudentById2 = async (req, res) => {
  try {
    const id = req.params.userid;
    const deletedDatas = await student.findByIdAndDelete(id);
    res.status(200).json(deletedDatas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStudentMany = async (req, res) => {
  try {
    const deletedDats = await student.deleteMany({ status: true });
    res.status(200).json(deletedDats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// This is for testing 👀⁉️
const getStudentsDetailsWithFilters = async (req, res) => {
  try {
    const { stdBranch, stdCollege, stdCgpa } = req.query;
    console.log("stdBranch :", stdBranch);
    console.log("stdCollege :", stdCollege);
    console.log("stdCgpa :", stdCgpa);
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *Nodemailer* Sending Mails
const TransportInfo = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"<Your Mail>",
        pass:"<Your App Password>"
    }
})

const SendMail = async(req,res) => {
    try{
        const result = await TransportInfo.sendMail({
            from:"<Your Mail>",
            to:"<Receiver Mail>",
            subject:"testing-subject",
            html:"",
            text:"kf lkasjd flaksjd flaksjfh lkasj fhlaksjd falskj lasdk",
            attachments:[
                {
                    filename:"25M11CS033 1.JPG",
                    path:"http://localhost:9000/25M11CS033%201.JPG"
                }
            ]
        })
        console.log(result)
        return res.status(200).json(result)
    }
    catch(err){
        return res.status(500).json(err)
    }
}

// Image Upload required function
const UploadFile = async (req, res) => {
  try {
    console.log(req.files);
    return res.status(200).json(req.files);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Token GenerateFunction
const GenerateToken = async (req, res) => {
  try {
    const JWTtoken = JWT.sign(
      {
        user_id: "11223344",
      },
      "!@#CCAfdv678678",
      {
        expiresIn: "10s",
      },
    );
    res.cookie("token", JWTtoken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 10 * 1000,
    });
    return res.status(200).json(JWTtoken);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// BCRPTY ENCRYPT
const Encryption = async (req, res) => {
  try {
    const hash = await Bcrypt.hash(req.body.password, 10);
    return res.status(200).json(hash);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// const Verifyencrypt = async (req, res) => {
//   try {
//     const encrypted = "asdfghjkl";
//     const result = await Bcrypt.compare(res.body.password, encrypted);
//     return res.status(200).json(result);
//   } catch {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

exports.getStudentsDetails = getStudentsDetails;
exports.addStudents = addStudents;
exports.getStudentById = getStudentById;
exports.getStudentsDetailsWithFilters = getStudentsDetailsWithFilters;
exports.updateStudents = updateStudents;
exports.UpdateStudentsStatus = UpdateStudentsStatus;
exports.deleteStudentById = deleteStudentById;
exports.deleteStudentById2 = deleteStudentById2;
exports.deleteStudentMany = deleteStudentMany;
exports.UploadFile = UploadFile;
exports.SendMail = SendMail;
exports.GenerateToken = GenerateToken;
exports.Encryption = Encryption;
// exports.Verifyencrypt = Verifyencrypt;
