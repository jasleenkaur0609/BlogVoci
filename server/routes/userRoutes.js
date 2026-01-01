import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMe } from "../controllers/userController.js";

const router = express.Router();

/* GET CURRENT USER */
router.get("/me", protect, getMe);

export default router;
