import Blog from "../models/Blog.js";

// 📝 Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, tags, category, isPublished } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      tags,
      category,
      author: req.user._id,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to create blog",
    });
  }
};

// 📚 Get All Published Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blogs",
    });
  }
};

// 📖 Get Single Blog
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name avatar bio"
    );

    if (!blog || !blog.isPublished) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Increase view count
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blog",
    });
  }
};

// ✏️ Update Blog (Author only)
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check ownership
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only edit your own blog",
      });
    }

    Object.assign(blog, req.body);

    if (req.body.isPublished && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update blog",
    });
  }
};

// 🗑 Delete Blog (Author only)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own blog",
      });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete blog",
    });
  }
};

// ❤️ Like / Unlike Blog
export const toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const userId = req.user._id;

    if (blog.likes.includes(userId)) {
      blog.likes.pull(userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();
    res.json({ likes: blog.likes.length });
  } catch (error) {
    res.status(500).json({
      message: "Failed to like blog",
    });
  }
};
