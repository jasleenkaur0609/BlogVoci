import Blog from "../models/Blog.js";
import User from "../models/User.js";

/* LIKE / UNLIKE BLOG */
export const toggleLikeBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { blogId } = req.params;

    const user = await User.findById(userId);
    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const liked = user.likedBlogs.includes(blogId);

    if (liked) {
      user.likedBlogs.pull(blogId);
      blog.likes.pull(userId);
    } else {
      user.likedBlogs.push(blogId);
      blog.likes.push(userId);
    }

    await user.save();
    await blog.save();

    res.json({
      liked: !liked,
      totalLikes: blog.likes.length
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to like blog" });
  }
};

/* SAVE / UNSAVE BLOG */
export const toggleSaveBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { blogId } = req.params;

    const user = await User.findById(userId);

    const saved = user.savedBlogs.includes(blogId);

    if (saved) {
      user.savedBlogs.pull(blogId);
    } else {
      user.savedBlogs.push(blogId);
    }

    await user.save();

    res.json({
      saved: !saved
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to save blog" });
  }
};
