const express = require('express')
const app = express()
const userModal = require("./models/UserModel")
const postModal = require("./models/PostModel")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hello..")
})

app.post("/create", async (req, res) => {
    let createdUser = await userModal.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    res.send(createdUser)
})

app.post("/:username/create/post", async (req, res) => {
    let user = await userModal.findOne({ username: req.params.username })

    // Post ko bata diya hai kis user ne banaya hai
    let createdPost = await postModal.create({
        content : "Hello this is my first post",
        user : user._id,  
    })
    
    // User ko bata diya ki kis post ne banaya hai
    user.posts.push(createdPost._id)
    await user.save()

    res.send({user,createdPost})
})

// Populate 
app.get("/users", async (req,res)=>{
    let user = await userModal.find().populate("posts")
    res.send(user)
})

app.get("/posts", async (req,res)=>{
    let posts = await postModal.find().populate("user")
    res.send(posts)
})

app.listen(3000)