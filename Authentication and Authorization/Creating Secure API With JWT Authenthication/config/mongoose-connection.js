const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to the Database..")
    } catch (error) {
        console.error(`Mongodb Connection Error : ${error}`)
        process.exit(1)
    }
}

module.exports = connectDB