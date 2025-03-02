const Post = require("../models/Post");

const mongoose = require("mongoose");

exports.getUserPostsAnalytics = async (req, res) => {
  try {
    const userIdObject = new mongoose.Types.ObjectId(req.user.userId);

    // Debugging: Log user posts
    const userPosts = await Post.find({ author: userIdObject });

    const postsByTag = await Post.aggregate([
      { $match: { author: userIdObject } }, 
      { $unwind: "$tags" }, 
      { $group: { _id: "$tags", count: { $sum: 1 } } }, 
      { $project: { _id: 0, tag: "$_id", count: 1 } }, 
    ]);

    // Convert array to object format { "react": 5, "nodejs": 3 }
    const tagCounts = {};
    postsByTag.forEach((tag) => {
      tagCounts[tag.tag] = tag.count;
    });

    res.json({
      totalPosts: userPosts.length,
      totalRecentPosts: userPosts.filter(
        (post) => new Date(post.createdAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length,
      postsByTag: tagCounts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

