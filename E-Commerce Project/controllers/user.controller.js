const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklistModel = require("../models/blacklist.model")

module.exports.signup = async (req, res, next) => {
    try {
        const { userName, email, password, role } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ userName, email, password: hashedPassword, role });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            message: "User Created SuccessFully",
            user,
            token
        })

    } catch (error) {
        next(error);
    }
}

module.exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "All Fields Are Required"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Incorrect Password"
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: "User SignedIn SuccessFully",
            user,
            token
        })
    } catch (error) {
        next(error)
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(400).json({
                message: "Token is required"
            })
        }
        const isTokenBlackListed = await blacklistModel.findOne({ token })
        if (isTokenBlackListed) {
            return res.status(400).json({
                message: "Token is already blacklisted"
            })
        }
        await blacklistModel.create({ token })
    } catch (error) {
        next(error)
    }
}

module.exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            message: "User Profile Fetched Successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}