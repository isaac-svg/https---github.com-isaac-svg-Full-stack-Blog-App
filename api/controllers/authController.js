const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = require("express")();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
exports.register = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Please provide credentials" });
  } else if (username.length < 4 || password.length < 4) {
    return res
      .status(401)
      .json({ message: "Username and Password can not be less than four(4)" });
  }

  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPass = await bcrypt.hash(password, salt);
    const userDoc = await User.create({ username, password: hashedPass });
    // const { password, ...otherInfo } = userDoc;
    res.status(200).json(userDoc);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = async function (req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(500).json({ message: "Please provide credentials" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }
    const validUser = await bcrypt.compare(password, user.password);
    if (validUser) {
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_SECRET
      );
      console.log(token, "from registration");
      return res.cookie("token", token).json("ok");
    }

    if (!validUser) {
      return res
        .status(404)
        .json({ message: "username or password incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
exports.profile = async (req, res) => {
  const { token } = req.cookies;
  console.log(req.cookies, "cookies from profile from profile");
  try {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    console.log(userInfo, "userInfo");
    if (userInfo) {
      res.json(userInfo);
    }
  } catch (error) {
    res.json({ message: "Invalide token" });
  }
};
