const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/multerdbtest")

const userSchema = mongoose.Schema({
    name : String,
    username : String,
    image : Buffer
})

module.exports = mongoose.model("user",userSchema)