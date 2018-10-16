const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  type: String,
  time: String,
  content: String
});

module.exports = mongoose.model("Article", ArticleSchema);
