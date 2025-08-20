const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))  // we can access or read the post form encoded data which from the browser form post method.

app.get("/",(req,res,next)=>{
    res.render("index")
})

// For the get method form handling 
app.get("/submit",(req,res,next)=>{
    console.log(req.query)  // for get we use req.query
    res.send("Submit..")
})

// For the Post method form handling
app.post("/submit",(req,res,next)=>{
    console.log(req.body)  // for post we use req.body
    res.send("Submit..")
})

app.listen(3000)