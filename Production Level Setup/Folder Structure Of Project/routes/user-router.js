const express = require('express')
const router = express.Router()
const {userController} = require("../controllers/user-controller")
const isLoggedin = require('../middlewares/isLoggedin')

router.get("/",isLoggedin,userController)

module.exports = router