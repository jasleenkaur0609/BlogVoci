import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔐 Protect routes (User must be logged in)
export const protect = async (req, res, next) => {
  let token;

  // Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from DB (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      // Block if user is disabled
      if (req.user.isBlocked) {
        return res.status(403).json({
          message: "Your account has been blocked",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

// 🛡 Admin-only access
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Admin access only",
    });
  }
};
