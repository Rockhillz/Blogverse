const Post = require("../models/Post");
const User = require("../models/User");

// Create a new Post......... Working
exports.createPost = async (req, res) => {
  const authorId = req.user.userId;

  const { title, content, tags } = req.body;

  try {
    // Validation
    if (
      !title ||
      !content ||
      !tags ||
      !Array.isArray(tags) ||
      tags.length === 0
    ) {
      return res
        .status(400)
        .json({
          message: "All fields are required, and tags must be an array.",
        });
    }

    const newPost = new Post({
      title,
      content,
      tags,
      author: authorId,
    });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts......... Working
exports.getAllPosts = async (req, res) => {
  try {
    const { author, tag, search } = req.query;
    let filter = {};


    // Filter by author
    if (author) {
      const users = await User.find({ username: { $regex: new RegExp(author, "i") } }, "_id");

      if (users.length > 0) {
        // Extract user IDs and filter posts by them
        const userIds = users.map(user => user._id);
        filter.author = { $in: userIds };
      } else {
        return res.json([]); // Return empty array if no matching users
      }
    }

    // Filter by tag
    if (tag) {
      filter.tags = { $regex: new RegExp(tag, "i") };
    }

    // Search by title (case-insensitive)
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const posts = await Post.find(filter).populate("author", "username").sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts by an author...... WOrking
 exports.getAllPostsByAuthor = async (req, res) => {
  const { authorId } = req.params;

  try {
    const posts = await Post.find({ author: authorId }).populate("author", "username");

    if (posts.length === 0) {
      return res.json([]); // Return empty array if no posts found
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single post......... Working
exports.getSinglePostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate("author", "username");

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a post...... Working
exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  const authorId = req.user.userId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.author.toString() !== authorId) {
      return res
        .status(403)
        .json({ message: "Unauthorized. Post must be deleted by the author." });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit a post.......... Working
exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, content, tags } = req.body;
  const authorId = req.user.userId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.author.toString() !== authorId) {
      return res.status(403).json({ message: "Unauthorized: You can only edit your own posts." });
    }

    // Update only the fields provided in req.body
    if (title) post.title = title;
    if (content) post.content = content;
    if (tags) post.tags = tags;

    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

