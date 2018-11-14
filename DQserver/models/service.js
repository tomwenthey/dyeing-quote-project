const mongoose = require("mongoose");
var SHA256 = require("crypto-js/sha256");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  username: String,
  password: String,
  name: String,
  phone: String,
  email: String
});

ServiceSchema.pre("save", function(next) {
  this.password = SHA256(this.password);
  next();
});

ServiceSchema.methods.comparePassword = function(candidatePassword) {
  return this.password === SHA256(candidatePassword).toString();
};

module.exports = mongoose.model("Service", ServiceSchema);
