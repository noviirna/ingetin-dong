const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { hashObject } = require("../helpers/objectHashing");
const emailValidationRegEx = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new Schema({
  email: {
    type: String,
    validate: [
      {
        validator: function(inputtedEmail) {
          return emailValidationRegEx.test(String(inputtedEmail).toLowerCase());
        },
        message: "please input a valid email address"
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
                  throw new Error("email already been used");
                } else {
                  resolve();
                }
              })
              .catch(err => {
                reject(err);
              });
          });
        },
        message: "that email already been used"
      }
    ]
  },
  password: {
    type: String,
    minlength: [8, "password must be 8 character"],
    required: true
  }
});

UserSchema.pre("save", function(next) {
  this.password = hashObject(this.password);
  next();
});

const Users = mongoose.model("User", UserSchema);
module.exports = Users;
