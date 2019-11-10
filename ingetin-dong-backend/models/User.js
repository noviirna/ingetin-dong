const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { hashObject } = require("../helpers/objectHashing");
const emailValidationRegEx = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameValidaitonRegEx = /^(?!.*__.*)(?!.*\.\..*)[a-z0-9_.]+$/iu;
const UserModel = "User";

const UserSchema = new Schema({
  email: {
    type: String,
    validate: [
      {
        validator: function(inputtedEmail) {
          return emailValidationRegEx.test(String(inputtedEmail).toLowerCase());
        },
        message: "Please input a valid email address."
      },
      {
        validator: function(inputtedEmail) {
          return new Promise((resolve, reject) => {
            this.model("User")
              .findOne({
                email: inputtedEmail
              })
              .then(result => {
                if (result) {
                  throw new Error("That email already been used.");
                } else {
                  resolve();
                }
              })
              .catch(err => {
                reject(err);
              });
          });
        },
        message: "That email already been used."
      }
    ],
    required: true
  },
  password: {
    type: String,
    minlength: [8, "Password should consists of minimal 8 character."],
    required: true
  },
  username: {
    type: String,
    minlength: [4, "Username should consists of minimal 4 character."],
    maxlength: [16, "Username should consists of maximal 16 character."],
    validate: [
      {
        validator: function(inputtedUsername) {
          return usernameValidaitonRegEx.test(inputtedUsername);
        },
        message:
          "Username must only consist of either letters, numbers, periods and underscores"
      },
      {
        validator: function(inputtedUsername) {
          return new Promise((resolve, reject) => {
            this.model("User")
              .findOne({
                username: inputtedUsername
              })
              .then(result => {
                if (result) {
                  throw new Error("That username already been used");
                } else {
                  resolve();
                }
              })
              .catch(err => {
                reject(err);
              });
          });
        },
        message: "That username already been used"
      }
    ],
    required: true
  }
});

UserSchema.pre("save", function(next) {
  this.password = hashObject(this.password);
  next();
});

module.exports = mongoose.model(UserModel, UserSchema);
