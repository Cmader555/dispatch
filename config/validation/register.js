const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  // data.name = !isEmpty(data.name) ? data.name : "";
  data.userID = !isEmpty(data.userID) ? data.userID : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";


  // Username checks
  if (Validator.isEmpty(data.userID)) {
    errors.userID = "userID field is required";
  }
  // else if (!Validator.isEmail(data.username)) {
  //   errors.username = "username is invalid";

  // }

  // phone checks
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone number is required";
  }

  //name checks
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name is required";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};