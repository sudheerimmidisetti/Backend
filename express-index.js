import express from 'express';
const app = express();

app.get("/get-data", (req, res) => {

    res.send("get Responding.....")
})
app.post("/post-data", (req, res) => {
    
    res.send(req.body)
})

app.listen(1610, () => {
    console.log("server running at port 1610")
});