const express = require('express')
const app = express()
const session = require('express-session')
const cors = require('cors')


app.use(session({
    secret : "random stuff",
    resave: false,
    saveUninitialized: false,
}))
app.use(cors())

app.get("/",(req,res,next)=>{
    res.send("Hello..")
})

// if you want to allow anly one Route to share no the all of 
app.get("/share",cors(),(req,res,next)=>{
    let message = req.flash("error")
    res.send(message.toString())
})

// CORS :- Cross Origin Resource Sharing
// Browsers have a security feature that don't allow us to get and show the data from the other web domain server and browser block us to do that. And if you want that the browsers will allow us to do that, then you need to enable CORS from that website server.

app.listen(3000)