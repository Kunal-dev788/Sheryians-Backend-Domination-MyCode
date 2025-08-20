const express = require('express')
const app = express()
const indexRouter = require("./Routes/indexRouter")
const apiRouter = require("./Routes/apiRouter")

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended : true}))

/*
app.get("/data",(req,res)=>{
    res.render("index")
})

app.get("/api/data",(req,res)=>{
    res.json({name : "Kunal Rathore", friends  : ["Raghvandra","Piyush","Avinash"]})
})
*/

app.use("/",indexRouter)
app.use("/api",apiRouter)


app.listen(3000)