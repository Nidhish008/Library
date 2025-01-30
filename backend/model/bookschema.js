const {Schema,model} = require("mongoose");

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  copies: { type: Number, required: true }
});

const Book = model("Book", bookSchema);
module.exports = Book;
