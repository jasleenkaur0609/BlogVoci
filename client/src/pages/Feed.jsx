import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Feed = () => {
  const { user, logout } = useAuth();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs")
      .then(res => setBlogs(res.data))
      .catch(() => {});
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h2>Blog Feed</h2>
        <div>
          <span>{user?.name}</span>
          <button onClick={logout} style={styles.logout}>Logout</button>
        </div>
      </header>

      <Link to="/create-blog" style={styles.createBtn}>
        ✍️ Create Blog
      </Link>

      <div style={styles.grid}>
        {blogs.map(blog => (
          <div key={blog._id} style={styles.card}>
            <h3>{blog.title}</h3>
            <p>{blog.content.slice(0, 120)}...</p>
            <small>{blog.category}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: { padding: "2rem", background: "#f8fafc", minHeight: "100vh" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  logout: {
    marginLeft: "1rem",
    padding: "6px 12px",
  },
  createBtn: {
    display: "inline-block",
    marginBottom: "2rem",
    textDecoration: "none",
    background: "#5f6cfb",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
    gap: "1.5rem",
  },
  card: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },
};

export default Feed;
