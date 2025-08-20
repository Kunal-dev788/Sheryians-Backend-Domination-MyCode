const mongoose = require('mongoose');
const Schema = mongoose.Schema;  // ✅ This line is required

const formattedDate = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

// Hisaab subdocument schema
const hisaabSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateCreated: { type: Date, default: formattedDate },
  isEncrypt: { type: Boolean, default: false },
  passcode: {
    type: String,
    required: function () {
      return this.isEncrypt;
    },
  },
});

// User schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hisaabs: [hisaabSchema]
});

module.exports = mongoose.model('User', userSchema);
