const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blackListSchema = new Schema({
    token: {
        type: String,
        required: true,
    }
}, { timestamps: true })

blackListSchema.index({ token: 1 }, { unique: true })

const BlackList = mongoose.model("blacklist", blackListSchema)
module.exports = BlackList