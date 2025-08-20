const express = require('express')
const app = express()
const mongooseConnection = require("./config/mongoose")
const userModal = require('./models/User')
const redis = require('redis')

const client = redis.createClient({
    username: 'default',
    password: '4aKzG3BBVni7UGmmVxeh8fQRLkh0H5AG',
    socket: {
        host: 'redis-10608.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 10608
    }
});

client.on('error', err => console.log('Redis Client Error', err));

async function connectRedis() {
    await client.connect();
    console.log("Redis connected ✅");
}
connectRedis();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Creating Users on Database by Postman Testing 
app.post("/create", async (req, res, next) => {
    // res.send(req.body)
    let { name, username, email, password } = req.body
    let createdUser = await userModal.create({
        username,
        name,
        email,
        password
    })
    res.send(createdUser)
})

// Reading Users on Database by Postman Testing
app.get("/users", async (req, res, next) => {
    let users = await userModal.find()
    res.send(users)
})

// Reading Single User on Database by Postman Testing
app.get("/users/:username", async (req, res, next) => {
    // Getting User by cache by Redis client.get
    let data = await client.get(`user:profile:${req.params.username}`)
    console.log(data)
    if(data) {
        console.log("Cache data gaya")
        return res.send(JSON.parse(data))
    }
    let user = await userModal.findOne({ username: req.params.username })
    // Setting User on cache by Redis client.set
    // await client.set(`user:profile:${user.username}`, JSON.stringify(user))
    console.log("db data gaya")
    res.send(user)
})

// Update Single User on Database by Postman Testing
app.get("/update/:username", async (req, res, next) => {
    let { name, username, email } = req.body
    let updatedUser = await userModal.findOneAndUpdate({ username: req.params.username }, { username, name, email }, { new: true })
    res.send(updatedUser)
})

// Deletion Single User on Database by Postman Testing
app.get("/delete/:username", async (req, res, next) => {
    let deletedUser = await userModal.findOneAndDelete({ username: req.params.username })
    res.send(deletedUser)
})


app.listen(3000)