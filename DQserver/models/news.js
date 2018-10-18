const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: String,
  image: [String],
  time: Date,
  content: String
});

module.exports = mongoose.model("News", NewsSchema);
