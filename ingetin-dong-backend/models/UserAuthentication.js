const mongoose = require("mongoose");
const exception = require("../constants/exception");
const Schema = mongoose.Schema;
const ModelName = "UserAuthenticationModel";
const UserModel = require("./User");

const MySchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    validate: [
      {
        validator: function (userId) {
          UserModel.findById(userId)
            .then((result) => {
              if (result) {
                resolve();
              } else {
                throw new Error(
                  "UserAuthentication Validation failed. User is not valid."
                );
              }
            })
            .catch((err) => {
              reject(err);
            });
        },
        message: "UserAuthentication Validation failed. User is not valid.",
      },
    ],
  },
  password: {
    type: String,
    required: true,
    validate: [
      {
        validator: function (password) {
          UserModel.findOne({ password })
            .then((result) => {
              if (result) {
                resolve();
              } else {
                throw new Error(
                  "UserAuthentication Validation failed. Password is not valid."
                );
              }
            })
            .catch((err) => {
              reject(err);
            });
        },
        message: "Validation failed. Password is not valid.",
      },
    ],
  },
  active: Boolean,
  activatedDate: Number,
});

MySchema.pre("save", function (next) {
  next();
});

module.exports = mongoose.model(ModelName, MySchema);
