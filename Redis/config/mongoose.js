const mongoose = require('mongoose')
const debugLog = require('debug')('development:mongooseconfig')
mongoose.connect("mongodb://127.0.0.1:27017/testingdb").then(()=>{
    console.log("Connected to MongoDB")
})

// mongoose.connect("mongodb+srv://kunalrathore788:YNQ7u8pvZ0drG78g@cluster0.y9caxrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
//     console.log("Connected to Atlas Database..")
// })

const db = mongoose.connection

db.on("error",err=>{
    debugLog(err)
})

db.on("open",()=>{
    debugLog("Connected to the Database..")
})

module.exports = db