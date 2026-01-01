import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const initialForm = { name: "", email: "", password: "" };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  /* 🔁 RETRY / COOLDOWN */
  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);

  /* 🤖 CAPTCHA */
  const [captchaChecked, setCaptchaChecked] = useState(false);

  /* 🔔 TOAST */
  const [toast, setToast] = useState(null);

  /* FORCE RESET ON LOAD */
  useEffect(() => {
    setForm(initialForm);
    setErrors({});
    setShowPassword(false);
  }, []);

  /* ⏱️ COOLDOWN TIMER */
  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  /* PASSWORD STRENGTH */
  const getPasswordStrength = (password) => {
    if (!password) return { label: "", percent: 0 };

    if (password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password))
      return { label: "Strong", percent: 100 };

    if (password.length >= 6 && /\d/.test(password))
      return { label: "Medium", percent: 65 };

    return { label: "Weak", percent: 30 };
  };

  const strength = getPasswordStrength(form.password);

  /* VALIDATION */
  const validate = () => {
    const errs = {};

    if (!form.name || form.name.length < 3)
      errs.name = "Name must be at least 3 characters";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address";

    if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";

    if (!captchaChecked)
      errs.captcha = "Please verify you are not a robot";

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

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cooldown > 0) return;
    if (!validate()) return;

    try {
      await register(form.name, form.email, form.password);

      showToast("success", "Account created successfully 🎉");

      setForm(initialForm);
      setAttempts(0);
      setCaptchaChecked(false);

      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";

      showToast("error", message);

      setAttempts((prev) => prev + 1);

      if (attempts + 1 >= 3) {
        setCooldown(30); // ⏳ 30 sec cooldown
        setAttempts(0);
      }

      if (message.toLowerCase().includes("email")) {
        setErrors({ email: message });
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* LEFT */}
        <div className="register-left">
          <div className="left-center">
            <h1>Welcome to BlogVoci ✍️</h1>
            <p>A modern platform for writers and creators.</p>
          </div>
          <p className="hero-footer">Write freely. Publish confidently.</p>
        </div>

        {/* RIGHT */}
        <div className="register-right">
          <div className="register-card">
            <h2>Create Account</h2>

            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
              {/* NAME */}
              <div className="input-group">
                <input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="new-name"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              {/* EMAIL */}
              <div className="input-group">
                <input
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="new-email"
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
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

                {form.password && (
                  <>
                    <div className="strength-bar">
                      <span
                        className={`strength-fill ${strength.label.toLowerCase()}`}
                        style={{ width: `${strength.percent}%` }}
                      />
                    </div>
                    <span className={`strength-text ${strength.label.toLowerCase()}`}>
                      Strength: {strength.label}
                    </span>
                  </>
                )}

                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>

              {/* CAPTCHA */}
              <div className="captcha-box">
                <input
                  type="checkbox"
                  checked={captchaChecked}
                  onChange={() => setCaptchaChecked(!captchaChecked)}
                />
                <label>I’m not a robot</label>
              </div>
              {errors.captcha && (
                <span className="error-text">{errors.captcha}</span>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                className="submit-btn"
                disabled={cooldown > 0}
              >
                {cooldown > 0
                  ? `Try again in ${cooldown}s`
                  : "Register"}
              </button>
            </form>

            <p className="footer-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
};

export default Register;
