import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/style.css";

import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import Details from "./components/Details";
import History from "./components/History";
import Profile from "./pages/Profile";
import MyBlogs from "./pages/MyBlogs";
import Notification from "./pages/Notification";
import Post from "./pages/Post";
import Reset from "./components/Reset";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminBlogs from "./pages/AdminBlogs";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<LoginRegister />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/history/:id" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blogs" element={<MyBlogs />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/post" element={<Post />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="/admin-blogs" element={<AdminBlogs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
