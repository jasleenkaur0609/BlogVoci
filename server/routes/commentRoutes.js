import express from "express";
import {
  addComment,
  getBlogComments,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 💬 Add comment or reply
router.post("/:blogId", protect, addComment);

// 📚 Get all comments for a blog
router.get("/:blogId", getBlogComments);

// ✏️ Edit own comment
router.put("/edit/:id", protect, updateComment);

// 🗑 Delete own comment
router.delete("/:id", protect, deleteComment);

export default router;
