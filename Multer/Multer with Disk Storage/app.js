const express = require('express')
const app = express()
const userModal = require('./models/UserModal')
const upload = require('./multer-setup')    

app.set('view engine','ejs')

app.get("/",(req,res)=>{
    res.render("index")
})

app.post("/upload",upload.single('image'),(req,res)=>{
    console.log(req.file)
    res.send("File Uploaded..")
})

app.listen(3000)