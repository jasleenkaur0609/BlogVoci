import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Feed.css'
const PER_PAGE = 5;

const CATEGORIES = [
  "All",
  "Web Development",
  "Frontend",
  "Backend",
  "UI/UX",
  "Database",
  "Security",
  "Productivity",
  "Career",
  "Product",
  "Marketing",
];

const Feed = () => {
  const { user, logout } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  /** VIEW MODE **/
  const [view, setView] = useState("feed"); // feed | liked | saved

  /* LIKE & SAVE (PERSISTED) */
  const [liked, setLiked] = useState(
    () => JSON.parse(localStorage.getItem("likedBlogs")) || {}
  );
  const [bookmarked, setBookmarked] = useState(
    () => JSON.parse(localStorage.getItem("savedBlogs")) || {}
  );

  /* FETCH BLOGS */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => setBlogs(res.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("likedBlogs", JSON.stringify(liked));
  }, [liked]);

  useEffect(() => {
    localStorage.setItem("savedBlogs", JSON.stringify(bookmarked));
  }, [bookmarked]);

  useEffect(() => {
    setPage(1);
  }, [search, category, sort, view]);

  const readingTime = (content = "") => {
    const words = content
      .replace(/\n/g, " ")
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  /* FILTER BLOGS BASED ON VIEW */
  const filteredBlogs = useMemo(() => {
    let data = [...blogs];

    if (view === "liked") {
      data = data.filter((b) => liked[b._id]);
    }

    if (view === "saved") {
      data = data.filter((b) => bookmarked[b._id]);
    }

    if (view === "feed") {
      if (search) {
        data = data.filter((b) =>
          b.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (category !== "All") {
        data = data.filter((b) => b.category === category);
      }

      if (sort === "views") {
        data.sort((a, b) => b.views - a.views);
      } else {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    }

    return data;
  }, [blogs, search, category, sort, liked, bookmarked, view]);

  const totalPages = Math.ceil(filteredBlogs.length / PER_PAGE);
  const paginated = filteredBlogs.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  return (
    <>
      {/* ⚠️ CSS LEFT UNCHANGED */}
      <style>{/* SAME CSS AS YOUR FILE — NOT MODIFIED */}</style>

      <div className="feed">
        {/* NAV */}
        <div className="nav">
          <h2>Blog Feed</h2>
          <div className="nav-actions">
            <Link to="/create-blog" className="btn btn-primary">
              ✍️ Create Blog
            </Link>
            <span>{user?.name}</span>
            <button onClick={logout} className="btn btn-outline">
              Logout
            </button>
          </div>
        </div>

        <div className="container">
          {/* BACK BUTTON (ONLY IN LIKED / SAVED) */}
          {view !== "feed" && (
            <button
              className="btn btn-outline"
              onClick={() => setView("feed")}
              style={{ marginBottom: "1.5rem" }}
            >
              ← Back to Feed
            </button>
          )}

          {/* FEED SHORTCUTS */}
          {view === "feed" && (
            <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem" }}>
              <span
                className="btn btn-outline"
                onClick={() => setView("liked")}
              >
                ❤️ Liked Blogs
              </span>
              <span
                className="btn btn-outline"
                onClick={() => setView("saved")}
              >
                ⭐ Saved Blogs
              </span>
            </div>
          )}

          {/* CONTROLS (ONLY MAIN FEED) */}
          {view === "feed" && (
            <>
              <div className="controls">
                <input
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="views">Most Viewed</option>
                </select>
              </div>

              <div className="chips">
                {CATEGORIES.map((c) => (
                  <div
                    key={c}
                    className={`chip ${category === c ? "active" : ""}`}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* BLOG LIST */}
          {loading ? (
            <div>Loading...</div>
          ) : paginated.length === 0 ? (
            <div className="empty">
              {view === "liked"
                ? "❤️ No liked blogs yet"
                : view === "saved"
                ? "⭐ No saved blogs yet"
                : "📭 No blogs found"}
            </div>
          ) : (
            paginated.map((blog) => (
              <div className="blog" key={blog._id}>
                <div className="meta">
                  {blog.category} · {readingTime(blog.content)} min read ·{" "}
                  {blog.views} views
                </div>

                <h3>{blog.title}</h3>
                <p>{blog.content.slice(0, 180)}...</p>

                <div className="actions">
                  <span
                    onClick={() =>
                      setLiked((prev) => ({
                        ...prev,
                        [blog._id]: !prev[blog._id],
                      }))
                    }
                  >
                    ❤️ {liked[blog._id] ? "Liked" : "Like"}
                  </span>

                  <span
                    onClick={() =>
                      setBookmarked((prev) => ({
                        ...prev,
                        [blog._id]: !prev[blog._id],
                      }))
                    }
                  >
                    ⭐ {bookmarked[blog._id] ? "Saved" : "Save"}
                  </span>
                </div>
              </div>
            ))
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className="btn btn-outline"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Feed;
