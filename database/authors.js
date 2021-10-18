const mongoose = require("mongoose");

//Create Authors schema
const AuthorSchema = mongoose.Schema({
  id: Number,
  name: String,
  books: [String],
});
const AuthorModel = mongoose.model("authors", AuthorSchema);
//"Authors" is the collection name in mongodb
module.exports = AuthorModel;
 