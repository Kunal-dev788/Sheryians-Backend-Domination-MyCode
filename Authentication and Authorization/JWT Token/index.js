const express = require('express')
const app = express()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

app.get("/", (req, res) => {
    res.send("Hey..")
})

app.get("/tokenmaker",(req, res) => {
    let token = jwt.sign({name : "kunal"},"helloo")
    res.send(token)
})

app.get("/datafetch",(req,res)=>{
    let data = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia3VuYWwiLCJpYXQiOjE3NTUxNTg1NjV9.WvkuRX2S-U_gC5mS8Frr6651EiScyJK0N42cszFN0IQ","helloo")
    res.send(data)
})

app.listen(3000)