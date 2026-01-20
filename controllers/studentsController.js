import student from "../models/studentsModels.js"

const getStudentsDetails = async(req, res) => {
    try{
        const mydata = await student.find();
        res.status(200).json(mydata);
    }catch(error){
        console.log(error);
        res.status(500).json({error: error.message})
    }

};
const addStudents = async(req, res) => {
    try{
         const data = req.body;
    console.log(data);
    // const addeddata = await student.create(data);
    const addeddata = await student.insertMany(data);
    console.log(addeddata);
    res.status(201).json("data added");
    }catch(error){
        res.status(500).json({error: error.message})
    }
};
const getStudentById = async (req, res) => {
    try{
        const id = req.params.userid;
        console.log("id :", id)
        const data = await student.findById({_id: id});
        console.log(data);
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

const updateStudents = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedData = await student.findOneAndUpdate(
            { stdRoll: id },
            data,
            { new: true }
        );

        if (!updatedData) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({
            message: "Student data updated successfully",
            student: updatedData
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const UpdateStudentsStatus = async (req, res) => {
    try {
        await student.updateMany(
            { status: false },
            { $set: {status:true} }
        );
        res.status(200).json({ message: "All inactive students have been updated to active." });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteStudentById = async (req, res) => {
    try{
        const id = req.params.userid;
        const deletedData = await student.findOneAndDelete({stdRoll: id});
        res.status(200).json(deletedData);

    }catch(error){
        res.status(500).json({error: error.message})}
}

const deleteStudentById2 = async(req,res) => {
    try{
        const id =req.params.userid;
        const deletedDatas = await student.findByIdAndDelete(id);
        res.status(200).json(deletedDatas);
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const deleteStudentMany = async(req,res)=>{
    try{
        const deletedDats = await student.deleteMany({status:true});
        res.status(200).json(deletedDats);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

// This is for testing 👀⁉️
const getStudentsDetailsWithFilters = async(req, res) => {
    try{
        const {stdBranch, stdCollege, stdCgpa} = req.query;
        console.log("stdBranch :", stdBranch);
        console.log("stdCollege :", stdCollege);
        console.log("stdCgpa :", stdCgpa);
        res.status(200).json("success");
    }catch(error){
        res.status(500).json({error: error.message})
    }

}


// Image Upload required function
const UploadFile = async(req,res) => {
    try{
        console.log(req.files)
        return res.status(200).json(req.files)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}

export {getStudentsDetails, addStudents, getStudentById, getStudentsDetailsWithFilters, updateStudents , UpdateStudentsStatus, deleteStudentById, deleteStudentById2, deleteStudentMany, UploadFile};