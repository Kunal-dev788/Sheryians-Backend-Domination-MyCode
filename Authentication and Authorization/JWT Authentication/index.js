const express = require('express')
const app = express()
const bcrypt = require("bcrypt")

app.get("/", (req, res) => {
    res.send("Hey..")
})

app.post("/encrypt", async (req, res) => {
    let salt = await bcrypt.genSalt(10)
    let encrypt = await bcrypt.hash("12345678", salt)
    res.send(encrypt)
})

app.post("/check", async (req, res) => {
    let result = await bcrypt.compare("12345678", "$2b$10$09/FWRD1KWJZpvrhmVchM.P8.63gL9zxcE99zaInpOMf8udWhVxCe")
    res.send(result)
})

app.listen(3000)