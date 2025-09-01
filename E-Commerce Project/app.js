require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/mongodb');
const indexRoutes = require('./routes/index.routes');
const userRoutes = require('./routes/user.routes');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

/*
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1OTU4MGViYTYzYjMyNDQ5YjllODAiLCJpYXQiOjE3NTY3MzA3NTIsImV4cCI6MTc1NjczNDM1Mn0.drSxrLTlAJfnfDthVyr0y4dnI04eknkjyxZuV-nf170"
*/