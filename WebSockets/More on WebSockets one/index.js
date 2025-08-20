const express = require('express')
const app = express()
const socketIO = require('socket.io')
const http = require('http')

const server = http.createServer(app)
const io = socketIO(server)

app.set("view engine", "ejs")
// accepting all users connection and whenever someone connect it they become socket that we mention in our function and all users have their own socket id. 
io.on("connection",(socket)=>{
    socket.on("abcd",(data)=>{
        console.log(data)
        io.emit("defg")  // sab ko bhejo event
        //socket.emit("defg")  // jisne bheja sirf usko bhejo event
    })
    // typing event 
    socket.on("typing",()=>{
        socket.broadcast.emit("kunal-typing")
    })
})

app.get("/",(req,res)=>{
    res.render("index")
})

server.listen(3000)