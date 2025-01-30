import { Outlet, useNavigate } from "react-router-dom";
import "./Home.css"; 

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Navigate to the root path on logout
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-title">ESHWAR LIBRARY</div>
        <div className="navbar-user" onClick={handleLogout}>Logout</div>
      </nav>

      {/* Banner Section */}
      <div className="banner">
        <h1>Digital BookStore</h1>
        <p>Discover a new chapter in reading with us</p>
      </div>

      {/* Content Section - Nested routes will be rendered here */}
      <main className="content">
        <Outlet /> {/* This is where the child content (like UserHome) will appear */}
      </main>
    </div>
  );
};

export default Home;
