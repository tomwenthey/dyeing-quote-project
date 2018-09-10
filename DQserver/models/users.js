const mongoose = require("mongoose");
const argon2 = require("argon2");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  name: String,
  phone: String,
  email: String
});

UserSchema.pre("save", function(next) {
  argon2
    .hash(this.password)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => {
      next(err);
    });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return argon2
    .verify(this.password, candidatePassword)
    .then(match => Promise.resolve(match))
    .catch(err => Promise.reject(err));
};

module.exports = mongoose.model("User", UserSchema);
