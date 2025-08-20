const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    content : String,
    date : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("Post",postSchema)