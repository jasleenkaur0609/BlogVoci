import User from "../models/User.js";

/* =========================
   GET LOGGED-IN USER
========================= */
export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("likedBlogs savedBlogs");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json({
    likedBlogs: user.likedBlogs,
    savedBlogs: user.savedBlogs,
  });
};
