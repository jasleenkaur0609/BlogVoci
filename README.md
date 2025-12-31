# 📝 BlogVoci – Full-Stack MERN Blogging Platform

BlogVoci is a **feature-rich, full-stack blogging platform** built using the **MERN stack**.
It allows users to write, publish, manage, and engage with blogs securely while offering admin-level moderation, analytics, and scalability.

This project is designed with **real-world architecture**, clean code structure, and production best practices.

---

## 🚀 Live Features Overview

### 🔐 Authentication & Security

* User registration & login
* JWT-based authentication
* Password hashing using bcrypt
* Protected routes
* Role-based access (User / Admin)
* Refresh tokens
* Password reset (future-ready)

---

### 👤 User Profile

* Create & update profile
* Profile picture upload
* Bio and social links
* Public author profile page
* My blogs dashboard

---

### 📝 Blog Management

* Create, edit, delete blogs
* Draft & publish blogs
* Rich text / Markdown editor
* Blog preview before publish
* Auto-save while writing
* Scheduled publishing
* Blog version history

---

### 🗂 Blog Content Features

* Categories & tags
* Featured blogs
* Reading time estimation
* Table of contents
* Code syntax highlighting
* Multiple images per blog
* SEO-friendly URLs

---

### 💬 Engagement

* Like / unlike blogs
* Comment system
* Nested comments (replies)
* Edit & delete own comments
* Blog reactions (❤️🔥👏)
* Bookmark blogs
* Follow authors

---

### 🔍 Search & Discovery

* Search blogs by title/content
* Filter by category & tags
* Sort by latest / popular
* Trending blogs
* Personalized feed (future-ready)

---

### 📊 Dashboard & Analytics

* User dashboard
* Blog views & likes count
* Performance analytics
* Monthly activity charts
* Top performing blogs

---

### 🛡 Admin Panel

* View & manage users
* Block / delete users
* Approve or reject blogs
* Feature blogs
* Moderate reported content

---

### 🌗 UI / UX Enhancements

* Fully responsive design
* Dark / light mode
* Skeleton loaders
* Toast notifications
* Smooth animations
* Infinite scrolling
* Error & 404 pages

---

### 🌍 SEO & Performance

* Meta tags for blogs
* Open Graph support
* Lazy-loaded images
* Sitemap generation
* Optimized API responses

---

### ☁️ Integrations

* Image uploads (Cloudinary)
* Social media sharing
* Email notifications
* Newsletter subscription
* Progressive Web App (PWA – optional)

---

## 🧠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router
* Axios
* Context API
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JSON Web Tokens (JWT)
* bcrypt

### Tools

* VS Code
* Git & GitHub
* Postman
* MongoDB Atlas

---

## 📂 Project Structure

```
BlogVoci/
 ├─ client/                 # Frontend (React + Tailwind)
 │   ├─ src/
 │   │   ├─ components/
 │   │   ├─ pages/
 │   │   ├─ context/
 │   │   ├─ services/
 │   │   ├─ App.jsx
 │   │   └─ main.jsx
 │
 ├─ server/                 # Backend (Node + Express)
 │   ├─ config/
 │   ├─ controllers/
 │   ├─ middleware/
 │   ├─ models/
 │   ├─ routes/
 │   ├─ server.js
 │   └─ .env
 │
 ├─ README.md
 └─ .gitignore
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🛠 How to Set Up BlogVoci Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/BlogVoci.git
cd BlogVoci
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔗 API Overview (Backend)

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| POST   | /api/auth/register | Register user   |
| POST   | /api/auth/login    | Login user      |
| GET    | /api/blogs         | Get all blogs   |
| GET    | /api/blogs/:id     | Get single blog |
| POST   | /api/blogs         | Create blog     |
| PUT    | /api/blogs/:id     | Update blog     |
| DELETE | /api/blogs/:id     | Delete blog     |
| POST   | /api/comments      | Add comment     |
| POST   | /api/like          | Like blog       |

---

## 🚀 Deployment Guide (Future)

* **Frontend**: Vercel / Netlify
* **Backend**: Render / Railway
* **Database**: MongoDB Atlas
* **Images**: Cloudinary

---

## 🛣 Roadmap

* [ ] Admin analytics dashboard
* [ ] Email notifications
* [ ] PWA offline support
* [ ] AI-based blog recommendations
* [ ] Multi-language support

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push and create a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👩‍💻 Author

**Jasleen Kaur**
MERN Stack Developer | RPA & Power Platform Consultant

---

### ⭐ If you find this project useful, don’t forget to star the repository!

