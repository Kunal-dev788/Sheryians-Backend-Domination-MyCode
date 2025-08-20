const express = require('express')
const router = express.Router()
const userModal = require('../models/user')

router.post("/create", async (req,res)=>{
   try {
     const createUser = await userModal.create({
        name : req.body.name,
        username  : req.body.username,
    })
    // res.json(createUser)
    res.json({success : true, message : "user created successfull.."})
   } catch (error) {
     res.json({success : false, message : `user was not created because of ${error.message}`})
   }
})

module.exports = router