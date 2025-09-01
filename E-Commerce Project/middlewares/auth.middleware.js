const userModal = require("../models/user.model")
const blacklistModal = require("../models/blacklist.model")
const jwt = require("jsonwebtoken")

module.exports.isAuthenicated = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const isBlacklisted = await blacklistModal.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({
                message: "unauthorized"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModal.findById(decode._id);

        if (!user) {
            return res.status(401).json({
                message: "unauthorized"
            })
        }
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

module.exports.isSeller = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== "seller") {
            return res.status(403).json({
                message: "forbidden"
            })
        }
        next()
    } catch (error) {
        next(error)
    }
}