const express = require('express')
const app = express()
const User = require("./models/UserModal")
const Post = require("./models/PostModal")

app.get("/",(req,res)=>{
    res.send("Hello..")
})

/*
Aggregation -> In MongoDB, aggregation is a powerful way to process and transform data. It allows you to perform operations like filtering, grouping, and calculating on the data stored in collections. The aggregation framework uses a pipeline concept, where documents are passed through a series of stages that transform them into a desired result.
Key Aggregation Concepts:
Pipeline: A series of stages that documents pass through. Each stage transforms the documents in some way.
Stages: Operations like filtering ($match), grouping ($group), sorting ($sort), and more.
*/
// 1. $match -> Filters documents based on certain criteria, similar to the find() method.
app.get("/test", async (req,res)=>{
    let user = await User.aggregate([{$match : {age : 30}}])
    res.send(user)
})

// 2. $group: Groups documents by a field and performs aggregate calculations like sum, count, avg, etc.
app.get("/test", async (req,res)=>{
    let user = await User.aggregate([
        {
            $group: {
                _id : "$age", // Group by age field
                userData : {
                    $push : "$$ROOT",
                },
            }
        }
    ])
    res.send(user)
})

// 3. $lookup: Performs a join between two collections, similar to populate.
app.get("/test", async (req,res)=>{
    let user = await Post.aggregate([
        {
            $lookup : {
                from : "users", // collection
                localField : "author", // kon fill-up hoga
                foreignField : "_id", // kaha se lana hai / yah wo (user) collection me kaha milega author me ek user id store hui hogi ki kis user ki post hai uss id se hmm uss user ka data le ayenga. yah bole tho author ki id hmme user collection ke _id me mileagi.
                as : "authorData"
            }
        }
    ])
    res.send(user)
})

// 4. $project: Selects specific fields to include or exclude in the output documents.
app.get("/test", async (req,res)=>{
    let user = await User.aggregate([
        {
            $project : {
                name : 1,
                email : 1,
                userAge : "$age"
            },
        },
    ])
    res.send(user)
})

// 5. $unwind: unwinded the objects on the one particular object means alice use contains tags array in their Schema and tags array may contain two values [nodejs,mongodb] so using unwinded on the user schema will create two seprate users example two seperate alice which on object tag contain nodejs and other alice object contain all the same schema with only mongodb value on their tag.

app.get("/test", async (req,res)=>{
    let user = await User.aggregate([
        {
            $unwind : "$tags",
        },
    ])
    res.send(user)
})