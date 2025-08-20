const express = require('express')
const router = express.Router()
const userModal = require('../models/user')
const user = require('../models/user')

const users = [
  {_id : '1', name : "alice",},
  {_id : '2', name : "john",},
]

router.get("/users", async (req,res)=>{
  res.json(users)
})

router.post("/users/create", async (req,res)=>{
  let index = Math.floor(Math.random()*10)
  users.push({_id : index, name : req.body.name})
  res.json(users)
})


module.exports = router