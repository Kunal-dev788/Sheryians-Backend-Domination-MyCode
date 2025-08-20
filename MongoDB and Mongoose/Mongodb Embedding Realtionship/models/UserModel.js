const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/testingdbembedding")

const posts = mongoose.Schema({
    content : String,
    date : {
        type : Date,
        default : Date.now()
    }
})

const userSchema = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    posts : [posts],
})

module.exports = mongoose.model("User",userSchema)