// MAIN BACKEND FILE
const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");

const express = require("express");
const app = express(); 
app.use(express.json());

//Import mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://amal_ts:nPkRJr6kh6Gax9vV@cluster0.x4j0e.mongodb.net/book-company?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://amal_ts:nPkRJr6kh6Gax9vV@cluster0.x4j0e.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const bcollection = client.db("book-company").collection("books").findOne({ISBN: "1234Three"});
//   bcollection.then((data)=>console.log(data)).catch((err)=>console.log(err));
// });
// client.close();

// async function listDatabases(client) {
//     databaseList = await client.db().admon().listDatabases();
//     console.log("THE DATABASES ARE:");
//     databaseList.databases.forEach(db=>console.log(db.name));
// }

// async function main() {
//     const uri = "mongodb+srv://amal_ts:nPkRJr6kh6Gax9vV@cluster0.x4j0e.mongodb.net/book-company?retryWrites=true&w=majority";
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     try{
//         await client.connect();
//         const result = await client.db("book-company").collection("books").findOne({ISBN:"1234Three"});
//         console.log(result);
//         //await listDatabases(client);
//     }
//     catch(err){
//         console.log(err);
//     }
//     finally {
//         await client.close();
//     }
// }
// main();




//  GET APIS


// http://localhost:3000/
app.get("/", (req, res) => {
    return res.json({"WELCOME": `to my Backend Software for the Book Company`});
});


/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
// http://localhost:3000/books
app.get("/books", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});



/*
Route           /book-isbn/:isbn
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
// http://localhost:3000/book-isbn/1234Three
app.get("/book-isbn/:isbn", async (req, res) => {
    // console.log(req.params);
    const {isbn} = req.params;
    // console.log(isbn);
    const getSpecificBook = await BookModel.findOne({ISBN: isbn});
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificBook===null) {
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook);
});


/*
Route           /book-category/:category
Description     Get specific books based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/
// http://localhost:3000/book-category/programming
app.get("/book-category/:category", async (req, res) => {
    // // console.log(req.params);
    const {category} = req.params;
    // // console.log(isbn);
    const getSpecificBooks = await BookModel.find({category: category});
    // // console.log(getSpecificBook);
    // // console.log(getSpecificBook.length);
    if(getSpecificBooks.length===0) {
        return res.json({"error": `No Books found for the category of ${category}`});
    }
    return res.json(getSpecificBooks);
});


/*
Route           /authors
Description     get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
// http://localhost:3000/authors
app.get("/authors", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});



/*
Route           /author-id/:id
Description     get all authors based on author id
Access          PUBLIC
Parameter       id
Methods         GET
*/
// http://localhost:3000/author-id/1
app.get("/author-id/:id", async (req, res) => {
// console.log(req.params);
const {id} = req.params;
// console.log(id);
const getSpecificAuthor = await AuthorModel.findOne({id: id});
// console.log(getSpecificAuthor);
// console.log(getSpecificAuthor.length);
if(getSpecificAuthor===null) {
    return res.json({"error": `No Author found for the id of ${id}`});
}
return res.json(getSpecificAuthor);
});



/*
Route           /author-isbn/:isbn
Description     get all authors based on author isbn
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
// http://localhost:3000/author-isbn/12One
app.get("/author-isbn/:isbn", async (req, res) => {
// // console.log(req.params);
const {isbn} = req.params;
// // console.log(isbn);
const getSpecificAuthors = await AuthorModel.find({books: isbn});
// // console.log(getSpecificAuthors);
// // console.log(getSpecificAuthors.length);
if(getSpecificAuthors.length===0) {
    return res.json({"error": `No Authors found for the isbn of ${isbn}`});
}
return res.json(getSpecificAuthors);
});


/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
// http://localhost:3000/publications
app.get("/publications", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});


/*
Route           /publication-id/:id
Description     get all publications based on books id
Access          PUBLIC
Parameter       id
Methods         GET
*/
// http://localhost:3000/publication-id/1
app.get("/publication-id/:id", async (req, res) => {
    // console.log(req.params);
    const {id} = req.params;
    // console.log(id);
    const getSpecificPublications = await PublicationModel.findOne({id: id});
    // console.log(getSpecificPublications);
    // console.log(getSpecificPublications.length);
    if(getSpecificPublications===null) {
    return res.json({"error": `No Publications found for the id of ${id}`});
}
return res.json(getSpecificPublications);
});



//  POST APIS

/*
Route           /book
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
// http://localhost:3000/book
app.post("/book", async (req, res) => {
    // console.log(req.body);
    const addNewBook = await BookModel.create(req.body);
    return res.json({bookAdded: addNewBook,message: "Book was added !!!" });
});


/*
Route           /author
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
// http://localhost:3000/author 
app.post("/author", async (req, res) => {
    // console.log(req.body);
    const addNewAuthor = await AuthorModel.create(req.body);
    return res.json({AuthorAdded: addNewAuthor,message: "Author was added !!!" });
});


/*
Route           /publication
Description     add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
// http://localhost:3000/publication
app.post("/publication", async (req, res) => {
    // console.log(req.body);
    const addNewPublication = await PublicationModel.create(req.body);
    return res.json({PublicationAdded: addNewPublication,message: "Publication was added !!!" });
});



// PUT APIS

/*
Route           /book/book-update/:isbn
Description     Update book details
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
// http://localhost:3000/book-update/12345ONE
app.put("/book-update/:isbn", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const {isbn} = req.params;
    const updateBook = await BookModel.findOneAndUpdate({ISBN:isbn},req.body,{new:true});
    return res.json({bookUpdated:updateBook, message:"Book was updated"});
});


/*
Route           /book/author-update/:id
Description     Update author details
Access          PUBLIC
Parameter       id
Methods         PUT
*/
// http://localhost:3000/author-update/1
app.put("/author-update/:id", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const {id} = req.params;
    const updateAuthor = await AuthorModel.findOneAndUpdate({id:id},req.body,{new:true});
    return res.json({AuthorUpdated:updateAuthor, message:"Author was updated"});
});


/*
Route           /book/publication-update/:id
Description     Update publication details
Access          PUBLIC
Parameter       id
Methods         PUT
*/
// http://localhost:3000/publication-update/1
app.put("/publication-update/:id", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const {id} = req.params;
    const updatePublication = await PublicationModel.findOneAndUpdate({id:id},req.body,{new:true});
    return res.json({PublicationUpdated:updatePublication, message:"Publication was updated"});
});



// DELETE APIS


/*
Route           /book-delete/:isbn
Description     delete book with isbn
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/
// http://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn", async (req, res) => {
    // console.log(req.params);
    const {isbn} = req.params;
    const deleteBook = await BookModel.deleteOne({ISBN:isbn});
    return res.json({bookDeleted: deleteBook,message:"Book was deleted"});
});


/*
Route           /book-author-delete/:isbn/:id
Description     delete author from book
Access          PUBLIC
Parameter       isbn, id
Methods         DELETE
*/
// http://localhost:3000/book-author-delete/12One/1
app.delete("/book-author-delete/:isbn/:id", async (req, res) => {
    // console.log(req.params);
    const {isbn,id} = req.params;
    let getSpecificBook = await BookModel.findOne({ISBN:isbn});
    if(getSpecificBook===null) {
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    else{
        getSpecificBook.authors.remove(id);
        const updateBook = await BookModel.findOneAndUpdate({ISBN:isbn},getSpecificBook,{new:true});
        return res.json({bookUpdated: updateBook, message:"Author was deleted From the Book!!!"});
    }   
});


/*
Route           /author-delete/:id
Description     delete author
Access          PUBLIC
Parameter       id
Methods         DELETE
*/
// http://localhost:3000/author-delete/2
app.delete("/author-delete/:id",async (req, res) => {
        const { id } = req.params;
        const deleteBook = await AuthorModel.deleteOne({ id: id }); //checks the respective isbn
        return res.json({ bookdeleted: deleteBook, message: "Author was deleted!!!" });
});


/*
Route           /publication-delete/:id
Description     delete publication
Access          PUBLIC
Parameter       id
Methods         DELETE
*/
// http://localhost:3000/publication-delete/7
app.delete("/publication-delete/:id",async (req, res) => {
    const { id } = req.params;
  //const { isbn } = req.params;
  const deleteBook = await PublicationModel.deleteOne({ id: id }); //checks the respective isbn
  return res.json({ bookdeleted: deleteBook, message: "publication was deleted!!!" });
});

app.listen(3000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
});
