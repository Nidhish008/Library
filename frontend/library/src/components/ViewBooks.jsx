import React, { useEffect, useState } from 'react';
import "./Viewbooks.css";
const ViewBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch all books when the component mounts
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="view-books-container">
      <h2>All Books</h2>
      <div className="book-list">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Copies</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.copies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBooks;
