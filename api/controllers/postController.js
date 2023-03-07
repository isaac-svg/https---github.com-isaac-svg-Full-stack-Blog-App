const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const fs = require("fs");
exports.create = async (req, res) => {
  const { title, summary, content } = req.body;
  const { originalname, path } = req.file;

  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = `${path}.${ext}`;
  fs.renameSync(path, newPath);
  console.log(path);
  try {
    const { token } = req.cookies;

    const decoded = jwt.verify(token, process.env.jwt_secret);
    const post = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: decoded.id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json("Post failed");
  }
};

exports.logout = (req, res) => {
  const { token } = req.cookies;
  const verifiedUser = jwt.verify(token, process.env.jwt_secret);
  if (verifiedUser) {
    res.cookie("token", "").json("ok");
  }
};

//
exports.getAllPosts = async (req, res) => {
  const postDoc = await Post.find({})
    .populate("author", ["username"])
    .sort({ createAt: -1 });

  res.json(postDoc);
};

exports.getSinglePost = async (req, res) => {
  const { id } = req.params;

  try {
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.json(postDoc);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.editPost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;
  const { id, summary, content, title } = req.body;
  const info = jwt.verify(token, process.env.jwt_secret);
  const postDoc = await Post.findById(id);
  console.log(postDoc);
  const isAuthor = JSON.stringify(info.id) === JSON.stringify(postDoc.author);
  if (isAuthor) {
    await postDoc.update({
      summary,
      title,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
  }
  res.json(postDoc);
};
