const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Create Schema
const userSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    // allowNull: false
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}


const User = mongoose.model("User", userSchema);

module.exports = User