const express = require('express')
const app = express()
const mongooseConnection = require("./config/mongoose")
const userModal = require('./models/User')
const debugLog = require('debug')('development:app')

app.get("/", (req, res, next) => {
    res.send("Hey..")
})

// For Writing in the Database
app.get("/create", async (req, res, next) => {
    // This create is a Asyncronous 
    let createdUser = await userModal.create({
        username: "Kunaldev788",
        officalName: "Kunal Rathore",
        email: "kunalrathore@gmail.com",
        password: "12345678"
    })
    debugLog("User Created..")
    res.send(createdUser)
})

// For Reading in the Database
app.get("/read", async (req, res, next) => {
    // findOne read only one User and if you want to get all users just use find()
    let user = await userModal.findOne({ officalName: "Kunal Rathore" })
    debugLog("readed")
    res.send(user)
})

// For Updating in the Database
app.get("/update", async (req, res, next) => {
    let updatedUser = await userModal.findOneAndUpdate({ officalName: "Kunal Rathore" }, { officalName: "Mr. Kunal Rathore" }, { new: true })
    res.send(updatedUser)
})

// For Deleting in the Database
app.get("/delete", async (req, res, next) => {
    let deletedUser = await userModal.findOneAndDelete({ officalName: "Mr. Kunal Rathore" })
    res.send(deletedUser)
    debugLog("User Deleted")
})



app.listen(3000)
