const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testingdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", err => {
  console.error("Connection error:", err);
});

db.once("open", () => {
  console.log("✅ Connected to the Database..");
});

module.exports = db;
