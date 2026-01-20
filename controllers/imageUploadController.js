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