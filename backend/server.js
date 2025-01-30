const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const db=require("./db/db");
const Book=require("./model/bookschema");
const User=require("./model/userschema");

const app=express();
app.use(cors());
app.use(express.json());
db();

app.get("/books/search", async (req, res) => {
  const { query } = req.query;

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } }
      ]
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      const isMatch = password === user.password;
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      res.json({
        message: 'Login successful',
        role: user.role,
      });
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  app.post("/books", async (req, res) => {
    const { title, author, category, copies } = req.body;
    try {
      const newBook = new Book({
        title,
        author,
        category,
        copies, 
      });

      await newBook.save();
  
      res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/books", async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  

  app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, category, copies } = req.body;
  
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { title, author, category, copies },
        { new: true } 
      );
  
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(3000, () => console.log("Server running on port 3000"));