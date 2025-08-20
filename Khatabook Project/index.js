const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

// This Home Route 
app.get("/", (req, res, next) => {
    fs.readdir("./hisaab", (err, files) => {
        if (err) return res.status(500).send(err)
        res.render("index", { files: files })
    })
})

// This is Create Route that will move us to create hisaab route page
app.get("/create", (req, res, next) => {
    res.render("create")
})

// This is create Hisab where we create our hisaab by form post method
app.post("/createhisaab", (req, res, next) => {
    fs.writeFile(`./hisaab/${req.body.title}.txt`, `${req.body.content}`, err => {
        if (err) return res.status(500).send(err)
        res.redirect("/")
    })
})

// This is Edit Route that will move us to update hisaab route
app.get("/edit/:filename", (req, res, next) => {
    fs.readFile(`./hisaab/${req.params.filename}`, "utf8", (err, data) => {
        if (err) res.status(500).send(err)
        res.render("edit",{filename : req.params.filename, data : data})
    })
})

// This is update hisab where we update our hisaabs by form post method
app.post("/update/:filename", (req, res, next) => {
    fs.writeFile(`./hisaab/${req.params.filename}`, `${req.body.content}`, err => {
        if (err) return res.status(500).send(err)
        res.redirect("/")
    })
})

// This is Hisaab Route where we view our hisaab in detail
app.get("/hisaab/:filename",(req,res,next)=>{
    fs.readFile(`./hisaab/${req.params.filename}`,"utf8",(err,data)=>{
        if(err) return res.status(500).send(err)
        res.render("hisaab",{filename : req.params.filename, data : data})
    })
})

// This is Delete Route which help us to delete that particular hisaab 
app.get("/delete/:filename",(req,res,next)=>{
    fs.unlink(`./hisaab/${req.params.filename}`,err=>{
        if(err) return res.status(500).send(err)
        res.redirect("/")
    })
})

app.listen(3000)