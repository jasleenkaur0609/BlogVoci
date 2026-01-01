import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Blogs = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const BLOGS_PER_PAGE = isAuthenticated ? 10 : 6;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showGate, setShowGate] = useState(false);

  /* FETCH BLOGS */
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to load blogs");
      } finally {
        setTimeout(() => setLoading(false), 700); // smooth loader
      }
    };

    fetchBlogs();
  }, []);

  /* FILTER + SEARCH */
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || blog.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, search, category]);

  /* PAGINATION */
  const start = (page - 1) * BLOGS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(
    start,
    start + BLOGS_PER_PAGE
  );

  /* SCROLL GATE (GUEST) */
  useEffect(() => {
    if (isAuthenticated) return;

    const onScroll = () => {
      if (window.scrollY > 500) setShowGate(true);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isAuthenticated]);

  return (
    <>
      <style>{`
        body { margin: 0; }

        .page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a, #020617);
          color: #e5e7eb;
          font-family: Inter, sans-serif;
        }

        /* NAVBAR */
        .navbar {
          padding: 1.2rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .btn {
          padding: 8px 18px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.85rem;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }

        .btn-primary {
          background: #4f46e5;
          color: #fff;
        }

        .btn-outline {
          border: 2px solid #4f46e5;
          background: transparent;
          color: #c7d2fe;
        }

        /* FILTER BAR */
        .filters {
          max-width: 900px;
          margin: 2rem auto;
          padding: 0 1.5rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filters input,
        .filters select {
          padding: 10px 14px;
          border-radius: 12px;
          background: #020617;
          color: #e5e7eb;
          border: 1px solid rgba(255,255,255,0.15);
        }

        /* BLOG LIST */
        .container {
          max-width: 900px;
          margin: auto;
          padding: 1.5rem;
        }

        .blog {
          padding: 2.2rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .blog span {
          font-size: 0.75rem;
          color: #818cf8;
        }

        .blog h3 {
          margin: 0.4rem 0;
          color: #f8fafc;
        }

        .blog p {
          color: #cbd5e1;
          line-height: 1.7;
        }

        .blur {
          filter: blur(6px);
          pointer-events: none;
        }

        /* SKELETON */
        .skeleton {
          height: 80px;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.04),
            rgba(255,255,255,0.08),
            rgba(255,255,255,0.04)
          );
          border-radius: 12px;
          margin-bottom: 1.5rem;
          animation: shimmer 1.2s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }

        /* PAGINATION */
        .pagination {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin: 3rem 0;
        }

        /* POPUP */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(2,6,23,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .popup {
          background: #020617;
          padding: 2.5rem;
          border-radius: 20px;
          max-width: 380px;
          text-align: center;
          position: relative;
        }

        .close {
          position: absolute;
          top: 12px;
          right: 16px;
          cursor: pointer;
        }
      `}</style>

      <div className="page">
        {/* NAVBAR */}
        <nav className="navbar">
          <span onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
            ← Back
          </span>

          {!isAuthenticated && (
            <div>
              <Link to="/login" className="btn btn-outline">Login</Link>{" "}
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          )}
        </nav>

        {/* FILTERS */}
        <div className="filters">
          <input
            placeholder="Search blogs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option>All</option>
<option>Web Development</option>
<option>Frontend</option>
<option>Backend</option>
<option>UI/UX</option>
<option>Database</option>
<option>Security</option>
<option>Productivity</option>
<option>Career</option>
<option>Product</option>
<option>Marketing</option>

          </select>
        </div>

        {/* BLOG LIST */}
        <div className="container">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="skeleton" />
              ))
            : paginatedBlogs.map((blog, index) => {
                const blurGuest =
                  !isAuthenticated && index >= BLOGS_PER_PAGE;

                return (
                  <div
                    key={blog._id}
                    className={`blog ${blurGuest ? "blur" : ""}`}
                  >
                    <span>{blog.category}</span>
                    <h3>{blog.title}</h3>
                    <p>{blog.content.slice(0, 150)}...</p>
                  </div>
                );
              })}
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button
            className="btn btn-outline"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Previous
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>

        {/* GATE */}
        {showGate && !isAuthenticated && (
          <div className="overlay">
            <div className="popup">
              <span className="close" onClick={() => setShowGate(false)}>✕</span>
              <h3>Continue Reading</h3>
              <p>Login or register to unlock unlimited blogs.</p>
              <Link to="/login" className="btn btn-outline">Login</Link>{" "}
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
