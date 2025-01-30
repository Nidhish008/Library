import React, { useState, useEffect } from 'react';
import "./UpdateBook.css";

const UpdateBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedAuthor, setUpdatedAuthor] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [updatedCopies, setUpdatedCopies] = useState('');

  useEffect(() => {
    // Fetch the list of books when the component mounts
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:3000/books');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    const updatedBook = {
      title: updatedTitle,
      author: updatedAuthor,
      category: updatedCategory,
      copies: updatedCopies,
    };

    try {
      const response = await fetch(`http://localhost:3000/books/${selectedBookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });
      setSelectedBookId("");
      setUpdatedTitle("");
      setUpdatedAuthor("");
      setUpdatedCategory("");
      setUpdatedCopies("");

      if (response.ok) {
        alert('Book updated successfully!');
      } else {
        alert('Failed to update book');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <h2>Update Book</h2>
      <form onSubmit={handleUpdateBook}>
        <select
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
        >
          <option value="">Select a book to update</option>
          {books.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title} by {book.author}
            </option>
          ))}
        </select>

        {selectedBookId && (
          <div>
            <input
              type="text"
              placeholder="Updated Title"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Updated Author"
              value={updatedAuthor}
              onChange={(e) => setUpdatedAuthor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Updated Category"
              value={updatedCategory}
              onChange={(e) => setUpdatedCategory(e.target.value)}
            />
            <input
              type="number"
              placeholder="Updated Copies"
              value={updatedCopies}
              onChange={(e) => setUpdatedCopies(e.target.value)}
            />
            <button type="submit">Update Book</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateBook;
