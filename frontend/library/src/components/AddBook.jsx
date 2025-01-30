import React, { useState } from 'react';
import "./AddBook.css";

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [copies, setCopies] = useState('');
  const [message, setMessage] = useState('');

  const handleAddBook = async (e) => {
    e.preventDefault();

    const bookData = { title, author, category, copies };
    setTitle("");
    setAuthor("");
    setCategory("");
    setCopies("");
    
    try {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        setMessage('Error adding book');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Copies"
          value={copies}
          onChange={(e) => setCopies(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
      {message && <p>{message}</p>}
      <div className="action-card">
      </div>
    </div>
  );
};

export default AddBook;
