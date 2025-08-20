const express = require('express')
const router = express.Router()
const userModal = require('../models/user')

router.post("/create", async (req,res)=>{
    const createUser = await userModal.create({
        name : req.body.name,
        username  : req.body.username,
    })
    res.send(`user created Successfully :- ${createUser}`)
})

module.exports = router