const { Model } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ModelName = "UserAuthenticationModel";

const MySchema = new Schema({
  userId: mongoose.Types.ObjectId,
  password: String,
  active: Boolean,
  activatedDate: Number
});

module.exports = mongoose.model(ModelName, MySchema);
