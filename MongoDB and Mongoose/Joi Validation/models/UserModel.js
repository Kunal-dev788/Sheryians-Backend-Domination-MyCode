const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/joitestdb")
const Joi = require("joi")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        required: true
    },
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        minLength: 10,
        required: true
    },
})

function validateModal(data) {
    let schema = Joi.object({
        username: Joi.string().min(3).required(),
        name: Joi.string().min(3).required(),
        email: Joi.string().email({tlds : {allow : ["com","net"]}}).required(),
        age: Joi.number().min(18).required(),
        contact: Joi.number().required()
    })
    .messages({
        'string.email' : "make sure your email is valid, only .com and .net domains are allowed"
    })
    let {error} =  schema.validate(data)
    return error
    // console.log(resolveans.error?.message)
}

let userModal = mongoose.model("User", userSchema)

module.exports = {validateModal,userModal}