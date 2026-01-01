import express from "express";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  toggleLike,
} from "../controllers/blogController.js";
import { adminOnly } from "../middleware/authMiddleware.js";
import {
  adminDeleteBlog,
  toggleFeaturedBlog,
} from "../controllers/blogController.js";


import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);

// Protected routes
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);
router.post("/:id/like", protect, toggleLike);

// 🛡 Admin routes
router.delete("/admin/:id", protect, adminOnly, adminDeleteBlog);
router.put("/admin/feature/:id", protect, adminOnly, toggleFeaturedBlog);


export default router;
