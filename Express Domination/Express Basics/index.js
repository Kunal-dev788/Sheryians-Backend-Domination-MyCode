const express = require('express')
const app = express()

// GET :- Asking Something from server
app.get('/',(req,res)=>{
    res.send("Hello Web..")
})

// About Route
app.get('/about',(req,res)=>{
    res.send("Hello About..")
})

// Catch-all route
// app.get("*", (req, res) => {
//     res.send("Hello..");
// });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


