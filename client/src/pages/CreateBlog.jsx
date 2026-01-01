import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./Register.css"; // reuse existing clean UI styles

const CreateBlog = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const initialForm = {
    title: "",
    content: "",
    category: "",
    tags: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  /* RESET ON LOAD */
  useEffect(() => {
    setForm(initialForm);
    setErrors({});
  }, []);

  /* VALIDATION */
  const validate = () => {
    const errs = {};

    if (!form.title || form.title.length < 5) {
      errs.title = "Title must be at least 5 characters";
    }

    if (!form.content || form.content.length < 50) {
      errs.content = "Content must be at least 50 characters";
    }

    if (!form.category) {
      errs.category = "Please select a category";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  /* SUBMIT BLOG */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const payload = {
        title: form.title,
        content: form.content,
        category: form.category,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      await axios.post("http://localhost:5000/api/blogs", payload);

      showToast("success", "Blog published successfully 🎉");

      setForm(initialForm);

      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Failed to create blog. Try again.";

      showToast("error", message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="register-page">
      <div className="register-container">
        {/* LEFT PANEL */}
        <div className="register-left">
          <div className="left-center">
            <h1>Create a New Blog ✍️</h1>
            <p>
              Share your ideas, experiences, and insights with the BlogVoci
              community.
            </p>
          </div>
          <p className="hero-footer">
            Your words can inspire others 🌍
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="register-right">
          <div className="register-card">
            <h2>Publish Blog</h2>

            <form onSubmit={handleSubmit} noValidate>
              {/* TITLE */}
              <div className="input-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Blog Title"
                  value={form.title}
                  onChange={handleChange}
                />
                {errors.title && (
                  <span className="error-text">{errors.title}</span>
                )}
              </div>

              {/* CATEGORY */}
              <div className="input-group">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid #c7d2fe",
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Technology">Technology</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Career">Career</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <span className="error-text">{errors.category}</span>
                )}
              </div>

              {/* TAGS */}
              <div className="input-group">
                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (comma separated)"
                  value={form.tags}
                  onChange={handleChange}
                />
              </div>

              {/* CONTENT */}
              <div className="input-group">
                <textarea
                  name="content"
                  placeholder="Write your blog content here..."
                  value={form.content}
                  onChange={handleChange}
                  rows={6}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid #c7d2fe",
                    resize: "vertical",
                  }}
                />
                {errors.content && (
                  <span className="error-text">{errors.content}</span>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish Blog"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
