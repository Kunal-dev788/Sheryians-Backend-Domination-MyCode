const express = require('express')
const app = express()
const userModal = require("./models/UserModel")

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
    user.posts.push({ content: "Hello this is my first post here" })
    await user.save()
    res.send(user)
})

app.listen(3000)