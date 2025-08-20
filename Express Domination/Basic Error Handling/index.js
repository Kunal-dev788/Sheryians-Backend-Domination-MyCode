const express = require('express')
const app = express()

app.get("/", (req, res, next) => {
    // error handling by ourself because we don't dependent on express
    try {
        res.send(hey)
    } catch (err) {
        next(err)
    }
})

app.get("/hey", (req, res, next) => {
    res.send("hey")
})

// Error Handling manage by express
app.use((err, req, res, next) => {
    // res.status(500).send("Internal Server Error..")
    // now handling try catch
    res.status(500).send(err.message)
})

app.listen(3000)