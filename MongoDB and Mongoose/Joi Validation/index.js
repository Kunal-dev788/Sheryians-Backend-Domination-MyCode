const express = require('express')
const app = express()
const {userModal,validateModal} = require("./models/UserModel")

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get("/",(req,res)=>{
    res.send("Chal Raha Hai..")
})

app.post("/create",async(req,res)=>{
    let {name,username,age,contact,email} = req.body
    let error = validateModal({name,username,age,contact,email})   
    if(error) return res.status(500).send(error.message)
    res.send("Everything is Worked..")
})

app.listen(3000 )