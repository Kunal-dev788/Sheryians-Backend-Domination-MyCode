const express = require('express')
const app = express()

app.get("/",(req,res,next)=>{
    res.send("Main Page..")
})

app.get("/about",(req,res,next)=>{
    res.send("About..")
})

app.get("/profile/:username",(req,res,next)=>{
    res.send(`${req.params.username}'s page`)
})

app.listen(3000)