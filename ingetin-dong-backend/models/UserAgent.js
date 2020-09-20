const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ModelName = "UserAgent";

const MySchema = new Schema({
  userId: mongoose.Types.ObjectId,
  ipAddress: String,
  userAgent: String,
  accessDate: Number
});

module.exports = mongoose.model(ModelName, MySchema);