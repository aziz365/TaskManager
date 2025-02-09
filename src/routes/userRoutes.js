require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    let user = await User.findOne({ email: data.email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User with this email id already exists" });
    }
    user = await User.create(data);
    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    let user = await User.findOne({ email: data.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: `User with ${data.email} email does not exist.` });
    }
    const match = await bcrypt.compare(data.password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ message: "Wrong Password! Please provide right one" });
    }
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ accessToken: accessToken });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
module.exports = router;
