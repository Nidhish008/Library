import React, { useState, useEffect } from 'react';
import "./DeleteBook.css";


const DeleteBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');

  useEffect(() => {
    // Fetch the list of books when the component mounts
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:3000/books');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const handleDeleteBook = async () => {
    try {
      const response = await fetch(`http://localhost:3000/books/${selectedBookId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Book deleted successfully!');
        setBooks(books.filter((book) => book._id !== selectedBookId)); // Remove the deleted book from the UI
      } else {
        alert('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h2>Delete Book</h2>
      <select
        value={selectedBookId}
        onChange={(e) => setSelectedBookId(e.target.value)}
      >
        <option value="">Select a book to delete</option>
        {books.map((book) => (
          <option key={book._id} value={book._id}>
            {book.title} by {book.author}
          </option>
        ))}
      </select>
      <button onClick={handleDeleteBook} disabled={!selectedBookId}>
        Delete Book
      </button>
    </div>
  );
};

export default DeleteBook;
