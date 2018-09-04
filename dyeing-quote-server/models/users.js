const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  name: String,
  phone: String,
  email: String
});

module.exports = mongoose.model("User", UserSchema);
