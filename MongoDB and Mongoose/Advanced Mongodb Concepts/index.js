const express = require('express')
const app = express()
const userModal = require("./models/User")

const dummyData = [
    {
        username: "john_doe",
        name: "John Doe",
        password: "password123",
        age: "28",
        isMarried: false,
        email: "john.doe@example.com"
    },
    {
        username: "sara_smith",
        name: "Sara Smith",
        password: "qwerty456",
        age: "34",
        isMarried: true,
        email: "sara.smith@example.com"
    },
    {
        username: "mike_jones",
        name: "Mike Jones",
        password: "mikepass789",
        age: "41",
        isMarried: true,
        email: "mike.jones@example.com"
    },
    {
        username: "lisa_wong",
        name: "Lisa Wong",
        password: "lisapass321",
        age: "25",
        isMarried: false,
        email: "lisa.wong@example.com"
    },
    {
        username: "alex_brown",
        name: "Alex Brown",
        password: "alexpass654",
        age: "30",
        isMarried: false,
        email: "alex.brown@example.com"
    },
    {
        username: "emma_white",
        name: "Emma White",
        password: "emmasecret999",
        age: "27",
        isMarried: true,
        email: "emma.white@example.com"
    },
    {
        username: "david_clark",
        name: "David Clark",
        password: "davidpass111",
        age: "35",
        isMarried: true,
        email: "david.clark@example.com"
    },
    {
        username: "nina_lopez",
        name: "Nina Lopez",
        password: "ninapass888",
        age: "29",
        isMarried: false,
        email: "nina.lopez@example.com"
    },
    {
        username: "chris_martin",
        name: "Chris Martin",
        password: "chrispass222",
        age: "32",
        isMarried: false,
        email: "chris.martin@example.com"
    },
    {
        username: "olivia_green",
        name: "Olivia Green",
        password: "oliviapass555",
        age: "26",
        isMarried: true,
        email: "olivia.green@example.com"
    }
];

app.get("/",(req,res,next)=>{
    res.send("Working..")
})

// InsertMany 
app.get("/createmany",async (req,res,next)=>{
    let data = await userModal.insertMany(dummyData)
    res.send(data)
})

// Equals Operator
app.get("/equal",async (req,res,next)=>{
    // let data = await userModal.find({age:26})
    let data = await userModal.find({age:{$eq :30}})
    res.send(data)
})

// not Equals Operator
app.get("/notequal",async (req,res,next)=>{
    let data = await userModal.find({age:{$ne :30}})
    res.send(data)
})

// less Than Operator
app.get("/lessthan",async (req,res,next)=>{
    let data = await userModal.find({age:{$lt :30}})
    res.send(data)
})

// less Than Equals To Operator
app.get("/lessequal",async (req,res,next)=>{
    let data = await userModal.find({age:{$lte :30}})
    res.send(data)
})

// Greater Than Operator
app.get("/greaterthan",async (req,res,next)=>{
    let data = await userModal.find({age:{$gt :30}})
    res.send(data)
})

// Greater Than Equals To Operator
app.get("/greaterequal",async (req,res,next)=>{
    let data = await userModal.find({age:{$gte :30}})
    res.send(data)
})

// In Operator (includes in this age)
app.get("/in",async (req,res,next)=>{
    let data = await userModal.find({age:{$in :[26,30,27]}})
    res.send(data)
})

// Not In Operator (not includes in this age)
app.get("/notin",async (req,res,next)=>{
    let data = await userModal.find({age:{$nin :[26,30,27]}})
    res.send(data)
})

// Exists Operator (means all those user in which these field wre exists)
app.get("/exists",async (req,res,next)=>{
    let data = await userModal.find({isAdmin:{$exists :true}})
    res.send(data)
})

// Exists Operator with false (means all those user in which these field were not exists)
app.get("/notexists",async (req,res,next)=>{
    let data = await userModal.find({isAdmin:{$exists :false}})
    res.send(data)
})

// And OR Operator (to find those users who are greater that 18 and/or those are married) type of situation
app.get("/and",async (req,res,next)=>{
    let data = await userModal.find({$and : [{isMarried : false},{age : {$gte : 18}}]})
    res.send(data)
})
app.get("/or",async (req,res,next)=>{
    let data = await userModal.find({$or : [{isMarried : false},{age : {$gte : 18}}]})
    res.send(data)
})

/*
starts with - ^
end with - $
in middle n numbers of letters - .*
*/

// Regex 
app.get("/regex",async (req,res,next)=>{
    // let data = await userModal.find({   name : {$regex : /^c/i}}) 
    let data = await userModal.find({   name : {$regex : /^o.*en$/i}}) 
    res.send(data)
})



app.listen(3000)