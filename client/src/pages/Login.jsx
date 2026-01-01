import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Register.css"; // reuse same premium styling

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const initialForm = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  /* 🔄 RESET ON LOAD */
  useEffect(() => {
    setForm(initialForm);
    setErrors({});
    setShowPassword(false);
  }, []);

  /* 🔔 TOAST */
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  /* ✅ VALIDATION */
  const validate = () => {
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* 🔐 SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await login(form.email, form.password);

      showToast("success", "Login successful 🎉");

      setForm(initialForm);
      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed";

      /* Field-level mapping */
      if (message.toLowerCase().includes("email")) {
        setErrors({ email: message });
      }

      if (message.toLowerCase().includes("password")) {
        setErrors({ password: message });
      }

      showToast("error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* LEFT PANEL */}
        <div className="register-left">
          <div className="left-center">
            <h1>Welcome Back 👋</h1>
            <p>
              Log in to continue writing, exploring ideas, and engaging with the
              BlogVoci community.
            </p>
          </div>
          <p className="hero-footer">
            Your voice matters. Let’s continue. ✨
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="register-right">
          <div className="register-card">
            <h2>Login to BlogVoci</h2>

            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
              {/* EMAIL */}
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="username"
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              {/* PASSWORD */}
              <div className="input-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="footer-text">
              Don’t have an account? <Link to="/register">Register</Link>
            </p>
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

export default Login;
