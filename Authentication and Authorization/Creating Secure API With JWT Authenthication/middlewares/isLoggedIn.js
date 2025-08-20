const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model")
require("dotenv")
module.exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.token) {
        try {
            const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
            req.user = await userModel.findOne({ email: data.email }).select("-password")
            next()
        } catch (error) {
            console.error(error)
        }
    }
    if (!req.cookies.token) res.status(401).send("Not Authorized, You don't have permission to access.")
}