const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("./../models/User");

router.get("/api/user/log_in", async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    const user = await User.find({ email: email, password: password });
    if (user) {
      // CHECK authentification
      let hash = SHA256(req.password + user.salt).toString(encBase64);
      if (user.hash === hash) {
        res.json(user);
      } else {
        res.send({ message: "Password/Hash mismatch" });
      }
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/api/user/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let token = req.headers.authorization;

    const user = await User.findById(id);

    if (user) {
      if (user.token === token) {
        res.json(user);
      } else {
        res.status(401).json({ error: { message: "Invalid token" } });
      }
    } else {
      res.json({ message: "User Id not found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/api/user/sign_up", async (req, res) => {
  try {
    const password = req.body.password;
    const token = uid2(16);
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);

    const user = new User({
      account: {
        username: req.body.username,
        biography: req.body.biography
      },
      email: req.body.email,
      token: token,
      salt: salt,
      password: password,
      hash: hash
    });

    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

module.exports = router;
