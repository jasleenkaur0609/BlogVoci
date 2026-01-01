import express from "express";

/* CONTROLLERS */
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  adminDeleteBlog,
  toggleFeaturedBlog,
} from "../controllers/blogController.js";

import {
  toggleLikeBlog,
  toggleSaveBlog,
} from "../controllers/blogActionController.js";

/* MIDDLEWARE */
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   🌍 PUBLIC ROUTES
========================= */
router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);

/* =========================
   🔐 USER PROTECTED ROUTES
========================= */
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

/* =========================
   ❤️ USER ACTION ROUTES
========================= */
router.put("/like/:blogId", protect, toggleLikeBlog);
router.put("/save/:blogId", protect, toggleSaveBlog);

/* =========================
   🛡 ADMIN ROUTES
========================= */
router.delete("/admin/:id", protect, adminOnly, adminDeleteBlog);
router.put("/admin/feature/:id", protect, adminOnly, toggleFeaturedBlog);

export default router;
