import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";

// 💬 Add comment or reply
export const addComment = async (req, res) => {
  try {
    const { content, parent } = req.body;
    const blogId = req.params.blogId;

    if (!content) {
      return res.status(400).json({
        message: "Comment content is required",
      });
    }

    // Check blog exists
    const blog = await Blog.findById(blogId);
    if (!blog || !blog.isPublished) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    const comment = await Comment.create({
      content,
      blog: blogId,
      author: req.user._id,
      parent: parent || null,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add comment",
    });
  }
};

// 📚 Get all comments for a blog
export const getBlogComments = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const comments = await Comment.find({
      blog: blogId,
      isDeleted: false,
    })
      .populate("author", "name avatar")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};

// ✏️ Update own comment
export const updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);

    if (!comment || comment.isDeleted) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only edit your own comment",
      });
    }

    comment.content = content;
    comment.isEdited = true;

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update comment",
    });
  }
};

// 🛡 Admin: Delete any comment
export const adminDeleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.isDeleted = true;
    comment.content = "This comment was removed by admin";

    await comment.save();
    res.json({ message: "Comment deleted by admin" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment" });
  }
};


// 🗑 Delete comment (soft delete)
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);

    if (!comment || comment.isDeleted) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own comment",
      });
    }

    comment.isDeleted = true;
    comment.content = "This comment has been deleted";

    await comment.save();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete comment",
    });
  }
};
