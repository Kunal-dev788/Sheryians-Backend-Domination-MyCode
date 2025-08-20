const http = require('http')

// Creating a HTTP Server and listen it on LocalHost Port 3000
/*
var server = http.createServer((req,res)=>{
    res.end("Server Start...")
})

server.listen(3000)
*/

// Routing :- We can create different - different Urls and Decide What they actually do.
// All the Comming data from the Browser are Store in the (req)
// Sending Data from here to Browser we use (res)
 const server = http.createServer((req,res)=>{
    if(req.url === "/") res.end("Main Route..")
    else res.end("Other Routes")
 })

 server.listen(3000)