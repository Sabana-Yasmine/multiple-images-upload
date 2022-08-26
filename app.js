const express = require("express");
const app = express();
const multer = require("multer");
const ejs = require("ejs");

app.use(express.static('upload'))
let data=[];

app.use(express.static("upload"));
app.set("view engine","ejs");

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"./views/upload")
    },
    filename : (req,file,cb)=>{
        cb(null,Date.now()+"."+file.originalname)
    }
})

const upload = multer({storage:storage}).array('file',5);

app.post("/uploading_images", async(req,res)=>{
    
    try{
        
    console.log("posting data");
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
                //res.send({status:"success",data : req.files})
                //for(let i of req.files){
                    //console.log("data", i)
                    //res.render('index',{data:i})}
            const data = req.files
               res.render("index",{data:data})
            }
        })
    }catch(err){
        res.json({"err": err.message})
    }
})

app.get("/",(req,res)=>{
   res.render('index',{data})
})

app.listen(5584,()=>{
    console.log("server created")
})

