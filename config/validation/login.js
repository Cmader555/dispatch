const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  
// Convert empty fields to an empty string so we can use validator functions
  data.userID= !isEmpty(data.userID) ? data.userID : "";
  data.password = !isEmpty(data.password) ? data.password : "";

// Email checks
  if (Validator.isEmpty(data.userID)) {
    errors.userID = "UserID field is required";
  } else if (!Validator.isEmail(data.userID)) {
    errors.userID = "UserID is invalid";
  }

// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};