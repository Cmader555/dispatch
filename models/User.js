const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Create Schema
const userSchema = new Schema({
  name: {
    type: String, 
    required: true, 
    unique: true
  },

  password: {
    type: String,
    required: true,
    // allowNull: false
  }, 
  phone: {
      type: String,
      required: false
  }
});

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}


const User = mongoose.model("User", userSchema);

module.exports = User