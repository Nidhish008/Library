import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/books/search?query=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for books:", error);
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <nav>
        <button onClick={() => navigate("/books")}>View Books</button>
      </nav>
      <div>
        <input
          type="text"
          placeholder="Search for a book"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

    <div className="search-results-container">
      <div className="search-results">
        {searchResults.length === 0 ? (
          <p>No matching books found</p>
        ) : (
          <ul>
            {searchResults.map((book) => (
              <li key={book._id}>
                <strong>{book.title}</strong> by {book.author} - {book.category} ({book.copies} copies)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>
  );
};

export default UserHome;
