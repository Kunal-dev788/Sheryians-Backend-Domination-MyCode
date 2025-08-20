const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hey..")
})

app.get("/cookie",(req,res)=>{
    res.cookie("age","25")
    res.send("Cookie Set..")
})

app.get("/cookieadv",(req,res)=>{
    res.cookie("age","25",{
        maxAge : 2000,
        httpOnly : true,
        secure : true
    })
    res.send("Cookie Set..")
})

app.get("/read",(req,res)=>{
    res.send(req.cookies.age)
})



app.listen(3000)