import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { toggleBlockUser } from "../controllers/authController.js";
import { registerLimiter } from "../middleware/rateLimit.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// 🛡 Admin block/unblock user
router.put("/admin/block/:id", protect, adminOnly, toggleBlockUser);

router.post("/register", registerLimiter, registerUser);

export default router;
