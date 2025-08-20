const express = require('express')
const app = express()
const socketIO = require('socket.io')
const http = require('http')

const server = http.createServer(app)
const io = socketIO(server)

app.set("view engine", "ejs")

io.on("connection",(socket)=>{
    console.log("connected")
    socket.join("science") // a particular person will join this room
})

app.get("/",(req,res)=>{
    res.render("index")
})

server.listen(3000)