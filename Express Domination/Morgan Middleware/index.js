const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan("combined"))

app.get("/",(req,res,next)=>{
  res.send("Hello..")  
})

app.listen(3000,()=>{
    console.log("Server Start at localhost:3000")
})