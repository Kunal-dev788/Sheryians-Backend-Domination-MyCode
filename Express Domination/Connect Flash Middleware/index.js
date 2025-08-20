const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('connect-flash')
const cors = require('cors')

// Connect Flash :- Whenever we want to redirect user from one route to another route with some data we need Connect Flash. Example :- if user will enter the wrong login credentials we have to redirect it to login page with some error data message like wrong credentials. => ek route me kuch save kar paye or dusra route me usse use kar paye... 

app.use(session({
    secret : "random stuff",
    resave: false,
    saveUninitialized: false,
}))
app.use(flash())

app.use(cors())

app.get("/",(req,res,next)=>{
    // Whenever anyone come on this route create a data on server
    req.flash("error","Invalid Credentials")  // which name and what you want to save
    res.redirect("/error")
})

app.get("/error",(req,res,next)=>{
    let message = req.flash("error")
    res.send(message.toString())
})

// if you want to allow anly one Route to share no the all of 
app.get("/share",cors(),(req,res,next)=>{
    let message = req.flash("error")
    res.send(message.toString())
})

// CORS :- Cross Origin Resource Sharing
// Browsers have a security feature that don't allow us to get and show the data from the other web domain server and browser block us to do that. And if you want that the browsers will allow us to do that, then you need to enable CORS from that website server.

app.listen(3000)