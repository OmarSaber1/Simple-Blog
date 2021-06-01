const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const config = require("config");
const Secret = config.get("Secret");

// hash password and token
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// import user Model
const User = require("../Models/users");

/// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(404).json({ err });
  }
});

/// user Register
router.post(
  "/",
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body(
      "password",
      "Please enter a password within 6 or more character"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // error if not all required data sent

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      // destructing Body => name , email , password

      const { name = "", email = "", password = "" } = req.body;

      // get user by email

      const userExist = await User.findOne({ email }).exec();

      // check if user already exists!
      console.log(`check user is ${userExist}`);

      // Send error
      if (userExist) {
        return res.status(400).send({ error: `User Already Exists` });
      }

      // if not found hash password and create  it
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        password: hashedPassword,
        email,
      });

      // Generate a token

      const token = jwt.sign({ id: user._id }, Secret);

      res.status(200).json({ user, token });
    } catch (err) {
      console.error(err);
      res.status(404).json({ err: `Internal Server Error` });
    }
  }
);
module.exports = router;
