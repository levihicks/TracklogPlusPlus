const User = require("../models/User"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcryptjs"),
  mongoose = require("mongoose"),
  config = require("../config/");

const { JWT_SECRET } = config;

module.exports = {
  create: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) throw Error("User already exists");

      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error("Something went wrong with bcrypt");

      const hash = await bcrypt.hash(req.body.pass, salt);
      if (!hash) throw Error("Something went wrong hashing the password");

      const newUser = new User({
        email: req.body.email,
        password: hash,
      });

      const savedUser = await newUser.save();
      if (!savedUser) throw Error("Something went wrong saving the user");

      const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
        expiresIn: "3600s",
      });

      res.status(200).json({
        token,
        user: {
          id: savedUser.id,
          email: savedUser.email,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },
  checkToken: (req, res, next) => {
    const token = req.header("x-auth-token");
    try {
      if (!token) throw Error("No token found");
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      // Add user from payload
      req.user = decoded;
      next();
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },
  authenticate: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw Error("User does not exist");

      const isMatch = await bcrypt.compare(req.body.pass, user.password);
      if (!isMatch) throw Error("Invalid credentials");

      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "3600s",
      });
      if (!token) throw Error("Couldnt sign the token");

      res.status(200).json({
        token,
        user: {
          id: user._id,
          email: user.email,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) throw Error("User Does not exist");
      res.json({ id: user._id });
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getLog: (req, res, next) => {
    User.findById(req.params.userId)
      .then((user) => {
        res.json(user.log);
      })
      .catch((e) => {
        res.status(400).json(e);
      });
  },
  addToLog: (req, res, next) => {
    User.findById(req.params.userId)
      .then((user) => {
        user.log.push(req.body.album);
        user.save().then(() => res.json({ success: true }));
      })
      .catch((e) => {
        res.status(400).json(e);
      });
  },
  removeFromLog: (req, res, next) => {
    User.updateOne(
      { _id: req.params.userId },
      { $pull: { log: { _id: req.params.albumId } } }
    )
      .then(() => res.json({ success: true }))
      .catch((e) => res.status(400).json(e));
  },
};
