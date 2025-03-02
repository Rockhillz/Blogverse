const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: function (tags) {
          return tags.every((tag) => typeof tag === "string" && tag.trim() !== "");
        },
        message: "Tags must be an array of non-empty strings",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
