const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    min: 4,
    required: [true, "please provide username"],
  },
  password: {
    type: String,
    required: true,
    min: 4,
  },
});


const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
