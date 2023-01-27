const express = require("express");
const { register, login, profile } = require("../controllers/authController");

const router = express.Router();

// router.post("/register", register);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(profile);

module.exports = router;
