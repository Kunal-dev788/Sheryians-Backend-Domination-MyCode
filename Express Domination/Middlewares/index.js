const express = require('express')
const app = express()

// Require Express-Session
const session = require('express-session')

/*
1. This Arrow function is called a handler function and it is also called a middleware function.
2. A function where you will get (request,response,next) as a parameter that types of function is called the middleware function.

3. Whenever you will send a request from browser to backend, they will go to their route first, and if you want to check that request before sending to the route or if add something on it, the middleware were used.
*/

// Now by the (use) method the express js treath this function as middleware function.
app.use((req,res,next)=>{
    console.log("Hello Middleware..")
    next()
})

// Secret :- Used for encryption
// resave :- if no changes found still you want to resave it.
// saveUninitialized :- Means if a new user come to your app and they do not perform any session like login, signup, etc.. still you want to save that user session.
app.use(session({
    secret: "random stuff",
    resave: false,
    saveUninitialized: false
}))

// now use 
app.get("/create",(req,res)=>{
    req.session.hello = true
    res.send("Done")
})
// now whats happens it whenever we go to the create route before reaching that route a session will create called hello and we perform any task and after that we finally come to the create route and this called middleware

//after that
app.get("/check",(req,res)=>{
    console.log(req.session.hello)
    res.send(req.session.hello)
})

app.get('/',(req,res)=>{
    res.send("Hello Web..")
})

// Cookies :- It is used for saving data in browser.
// Sessions :- It is used for saving data in servers. But the disadvantage is that if the server will power-down or restart all the saved data will be erased.


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});