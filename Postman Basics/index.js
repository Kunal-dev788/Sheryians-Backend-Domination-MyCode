const express = require('express')
const app = express()

const data = [1,2,3,4,5]

app.get("/",(req,res,next)=>{
    res.send("Hello..")
})

app.get("/data",(req,res,next)=>{
    res.send(data)
})

app.post("/data/:number",(req,res,next)=>{
    data.push(parseInt(req.params.number))
    res.send(data)
})

app.listen(3000)