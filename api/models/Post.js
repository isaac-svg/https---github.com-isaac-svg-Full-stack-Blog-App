const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    cover: String,
    content: String,
    title: String,
    summary: String,
    author: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
