const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
app.use(cors());

app.use(express.static('uploads'))

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads")
    },
    filename : (req,file,cb)=>{
        cb(null,Date.now()+"."+file.originalname)
    }
})


const upload = multer({storage:storage}).array('file',5);


app.post("/uploading_images", async(req,res)=>{
    console.log("posting data");
    try{
        upload(req,res,(err)=>{
            if(!req.files)
            {
                res.json({"status" : "failure", message : "select your file" })
            }
            else if(err)
            {
                res.json({"err": err.message})
            }
            else if(req.files.length == 0)
            {
                res.json({status:"failure", message: "please select your files"})
            }
            else
            {
                res.json({ststus:"success",data : req.files})
            }
                 
            
        })
    }catch(err){
        res.json({"err": err.message})
    }
})

app.get("/",(req,res)=>{
    console.log("get data");
    res.sendFile(__dirname + "/index.html")
})

app.listen(4040,()=>{
    console.log("server created")
})

