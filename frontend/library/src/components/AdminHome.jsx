import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="book-list">
        <h3>All Books</h3>
        {books.length === 0 ? (
          <p>No Books Available</p>
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                <strong>{book.title}</strong> by {book.author} - {book.category} ({book.copies} copies)
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="actions">
        <button onClick={() => navigate("/add-book")}>Add Book</button>
        <button onClick={() => navigate("/update-book")}>Update Book</button>
        <button onClick={() => navigate("/delete-book")}>Delete Book</button>
      </div>
    </div>
  );
};

export default AdminHome;
