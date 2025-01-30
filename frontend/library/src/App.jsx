import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminHome from "./components/AdminHome";
import UserHome from "./components/UserHome";
import ViewBooks from "./components/ViewBooks";
import AddBook from "./components/AddBook";
import Register from "./components/Register";
import UpdateBook from "./components/UpdateBook";
import DeleteBook from "./components/DeleteBook";
import Home from "./components/Home";
import "./styles.css"; // Importing the global styles

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes that don't need the Home layout */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* All other routes will be nested inside the Home layout */}
        <Route path="/" element={<Home />}>
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/books" element={<ViewBooks />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/update-book" element={<UpdateBook />} />
          <Route path="/delete-book" element={<DeleteBook />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
