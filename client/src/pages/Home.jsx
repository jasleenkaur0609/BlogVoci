import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }

        .home {
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

        .logo {
          font-size: 1.4rem;
          font-weight: 800;
          color: #f9fafb;
        }

        .nav-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .nav-link {
          color: #c7d2fe;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .nav-link:hover {
          color: #fff;
        }

        .btn {
          padding: 10px 22px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          border: none;
          text-decoration: none;
        }

        .btn-primary {
          background: #4f46e5;
          color: #fff;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #4f46e5;
          color: #c7d2fe;
        }

        /* CONTAINER */
        .container {
          max-width: 1100px;
          margin: auto;
          padding: 5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }

        /* HERO */
        .hero h1 {
          font-size: 3.4rem;
          font-weight: 800;
          color: #f9fafb;
        }

        .hero p {
          max-width: 640px;
          margin-top: 1.2rem;
          font-size: 1.15rem;
          line-height: 1.7;
          color: #cbd5f5;
        }

        .hero-actions {
          margin-top: 2.5rem;
          display: flex;
          gap: 1rem;
        }

        /* SECTIONS */
        .section-title {
          font-size: 2.2rem;
          color: #f8fafc;
          margin-bottom: 2rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px,1fr));
          gap: 2rem;
        }

        .card {
          background: rgba(255,255,255,0.04);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .card h3 {
          margin-bottom: 0.6rem;
          color: #f8fafc;
        }

        .card p {
          font-size: 0.95rem;
          color: #cbd5e1;
          line-height: 1.6;
        }

        /* CTA */
        .cta {
          padding: 3.5rem;
          border-radius: 26px;
          background: rgba(79,70,229,0.12);
          border: 1px solid rgba(79,70,229,0.25);
          text-align: center;
        }

        .cta h2 {
          font-size: 2.3rem;
          margin-bottom: 1rem;
        }

        .cta p {
          color: #c7d2fe;
          margin-bottom: 2rem;
        }

        @media (max-width:768px) {
          .hero h1 { font-size: 2.5rem; }
        }
      `}</style>

      <div className="home">
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="logo">BlogVoci</div>
          <div className="nav-actions">
            <Link to="/blogs" className="nav-link">Blogs</Link>

            {isAuthenticated ? (
              <>
                <span className="nav-link">{user?.name}</span>
                <button onClick={logout} className="btn btn-outline">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/register" className="btn btn-primary">Get Started</Link>
              </>
            )}
          </div>
        </nav>

        <div className="container">
          {/* HERO */}
          <section className="hero">
            <h1>Write. Share. Inspire.</h1>
            <p>
              BlogVoci is a modern platform built for thoughtful writers and
              curious readers. Discover ideas, publish stories, and grow your voice.
            </p>
            <div className="hero-actions">
              <Link to="/blogs" className="btn btn-primary">Explore Blogs</Link>
              {!isAuthenticated && (
                <Link to="/register" className="btn btn-outline">Join Free</Link>
              )}
            </div>
          </section>

          {/* VALUE */}
          <section>
            <h2 className="section-title">Built for Meaningful Writing</h2>
            <div className="grid">
              <div className="card">
                <h3>✍️ Distraction-free writing</h3>
                <p>Minimal editor focused on clarity and depth.</p>
              </div>
              <div className="card">
                <h3>📚 Reader-first experience</h3>
                <p>No clutter. Just stories worth reading.</p>
              </div>
              <div className="card">
                <h3>🌱 Grow your audience</h3>
                <p>Engage with readers who value quality content.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="cta">
            <h2>Your ideas deserve an audience</h2>
            <p>Start writing today or explore blogs from writers worldwide.</p>
            <Link to="/register" className="btn btn-primary">Create Free Account</Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
