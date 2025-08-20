const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.get("/",(req,res,next)=>{
  res.send("Hello..")  
})

app.get("/banned",(req,res,next)=>{
    res.cookie("name","Kunal")
    res.send("Banned..")
})

app.get("/check",(req,res,next)=>{
    console.log(req.cookies.name)
    res.send("Checking..")
})

app.listen(3000,()=>{
    console.log("Server Start at localhost:3000")
})