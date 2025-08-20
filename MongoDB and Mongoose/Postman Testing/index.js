const express = require('express')
const app = express()
const mongooseConnection = require("./config/mongoose")
const userModal = require('./models/User')
const e = require('express')
const debugLog = require('debug')('development:app')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res, next) => {
    res.send("Hey..")
})

// Creating Users on Database by Postman Testing 
app.post("/create",async (req,res,next)=>{
    // res.send(req.body)
    let {name,username,email,password} = req.body
    let createdUser = await userModal.create({
        username,
        name,
        email,
        password
    })
    res.send(createdUser)
})

// Reading Users on Database by Postman Testing
app.get("/users",async (req,res,next)=>{
    let users = await userModal.find()
    res.send(users)
})

// Reading Single User on Database by Postman Testing
app.get("/users/:username",async (req,res,next)=>{
    let user = await userModal.findOne({username : req.params.username})
    res.send(user)
})

// Update Single User on Database by Postman Testing
app.get("/update/:username",async (req,res,next)=>{
     let {name,username,email} = req.body
    let updatedUser = await userModal.findOneAndUpdate({username : req.params.username},{username,name,email},{new:true})
    res.send(updatedUser)
})

// Deletion Single User on Database by Postman Testing
app.get("/delete/:username",async (req,res,next)=>{
    let deletedUser = await userModal.findOneAndDelete({username : req.params.username})
    res.send(deletedUser)
})


app.listen(3000)