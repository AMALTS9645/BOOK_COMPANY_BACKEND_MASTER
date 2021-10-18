const mongoose = require("mongoose");

//Create book schema
const BookSchema = mongoose.Schema({
  ISBN: String,
  title: String,
  authors: [Number],
  language: String,
  pubDate: String,
  numOfPage: Number,
  category: [String],
  publications: Number
});
const BookModel = mongoose.model("books", BookSchema);
//"books" is the collection name in mongodb
module.exports = BookModel;
