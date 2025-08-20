const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

const server = http.createServer(app)
const io = socketIO(server)

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
    socket.on("signalingMessage", message =>{
        socket.broadcast.emit("signalingMessage", message)
    } )
})

app.get("/", (req, res) => {
    res.render("index")
})

server.listen(3000, () => {
    console.log("Server is running on port 3000")
})
