const userModal = require("../models/user-model")
const bcrypt = require("bcrypt")
const generateToken = require("../utils/generateToken")

module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        let user = await userModal.findOne({ email })
        if (user) {
            return res.status(400).send("Your Account Already Exists, Please Login..")
        }

        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)

        user = await userModal.create({
            name,
            email,
            password: hash,
        })

        const token = generateToken({ email })
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })

        res.status(201).send(user)
    } catch (err) {
        console.error(err)
        res.status(500).send("Server Error")
    }
}

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        let foundUser = await userModal.findOne({ email })
        if (!foundUser) return res.status(401).send("Email or Password Invaild.")
        const result = await bcrypt.compare(password, foundUser.password)
        if (result) {
            const token = generateToken({ email })
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
            })

            res.status(201).send("logged in successfully.")
        }
        else {
            res.status(401).send("Email or Password Invaild.")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

module.exports.logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
    })
    res.status(201).send("Logout Successfull.")
}

module.exports.getUserProfile = (req, res) => {
    res.send("LoggedIn Valid..")
}
