const mongoose = require("mongoose")

mongoose.connect(`${process.env.MONGODB_URI}/testdbtest`)

let db = mongoose.connection

db.once("open",()=>{
    console.log("Connected..")
})

module.exports = db