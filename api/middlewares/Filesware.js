const multer = require("multer");
const uploadMiddleware = multer({ dest: "../../api/uploads" });

function filesware(req, res, next) {
  next(uploadMiddleware.single("cover"));
}
module.exports = filesware;
