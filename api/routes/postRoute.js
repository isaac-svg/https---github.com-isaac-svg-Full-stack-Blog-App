const express = require("express");
const {
  create,
  logout,
  getAllPosts,
  getSinglePost,
  editPost,
} = require("../controllers/postController");
// const filesware = require("../middlewares/Filesware");
const router = express();
const multer = require("multer");
const uploadMiddleware = multer({ dest: `uploads/` });

router.route("/post").post(uploadMiddleware.single("file"), create);
router.route("/logout").post(logout);
router.route("/post").get(getAllPosts);
router.route("/post/:id").get(getSinglePost);
router.route("/post/").put(uploadMiddleware.single("file"), editPost);
module.exports = router;
