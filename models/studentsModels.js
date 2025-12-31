import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    stdName: {
        type: String
    },
    stdRoll : {
        type: String
    },
    stdPhone: {
        type : Number
    },
    stdStatus: {
        type : Boolean
    }
});

const student = mongoose.model("student", studentSchema);
export default student;