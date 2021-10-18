const mongoose = require("mongoose");

//Create publications schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String]
});
const PublicationModel = mongoose.model("Publications", PublicationSchema);
//"Publications" is the collection name in mongodb
module.exports = PublicationModel;
 